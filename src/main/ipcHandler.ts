import { ipcMain } from "electron"
import { getCustomRepository } from "typeorm"
import { Article } from "./database/entities/Article"
import { Feed } from "./database/entities/Feed"
import ArticleMapper from "./database/mappers/ArticleMapper"
import FeedMapper from "./database/mappers/FeedMapper"
import ArticleRepository from "./database/repositories/ArticleRepository"
import FeedRepository from "./database/repositories/FeedRepository"
import TagRepository from "./database/repositories/TagRepository"
import { RSS } from "./rss/data"
import { loadFeed } from "./rss/rss"

/**
 * The handler behaves as the data communication layer. It should not be communicating with the database directly, not
 * without direct access to the database
 */

export default function setupHandlers() {
  const feedRepository = getCustomRepository(FeedRepository)
  const articleRepository = getCustomRepository(ArticleRepository)
  const tagRepository = getCustomRepository(TagRepository)

  ipcMain.handle('get-feed', async (_e, feedUrl: string) => await loadFeed(feedUrl))
  ipcMain.handle('get-article', async (_e, articleId: number) => ArticleMapper.toRSSItem(await articleRepository.getArticle(articleId)))
  ipcMain.handle('add-feed', async (_e, rawFeed, feedUrl, tagName) => handleAddFeed(rawFeed, feedUrl, tagName))
  ipcMain.handle('get-tags', async (_e) => (await tagRepository.getAvailable()).map(t => t.tagName))
  ipcMain.handle('get-tag-feeds', async (_e) => FeedMapper.toTagFeeds(await feedRepository.getAvailable()))
  ipcMain.handle('refresh-feeds', async (_e) => handleRefreshFeeds())
}

// TODO: Experiement with sending this to separate thread
// TODO: Handle concurrent updates to the tag list
async function handleAddFeed(rawFeed: RSS.Feed, feedUrl: string, tagName: string | null): Promise<Feed> {
  const feed = FeedMapper.fromRSSFeed(rawFeed, feedUrl)

  if (tagName) {
    const tag = await getCustomRepository(TagRepository).createIfNotExists(tagName)
    feed.tag = tag
  }

  const newFeed = await getCustomRepository(FeedRepository).save(feed)

  return newFeed
}

async function handleRefreshFeeds() {
  const feedRepository = getCustomRepository(FeedRepository)
  const availableFeeds = await getCustomRepository(FeedRepository).getAvailable()

  const updatedFeeds = await Promise.all(availableFeeds.map(refreshFeed))
  feedRepository.save(updatedFeeds)
}

/// Refreshes a single feed
async function refreshFeed(original: Feed) {
  /// Fetch feed again
  const latest = FeedMapper.fromRSSFeed(await loadFeed(original.rssUrl), original.rssUrl)
  const hasChange = (latest.lastUpdate && original.lastUpdate)
    && (latest.lastUpdate.getTime() > original.lastUpdate.getTime())
  if (!hasChange) return null

  console.log(`Updating ${original.feedTitle}`)

  /// Update existing articles
  const updatedArticles = updateArticles(original, latest)

  /// Add new articles
  const originalIdentifiers = original.articles.map(article => generateArticleIdentifier(article))
  const newArticles = latest
    .articles
    .filter(article => !originalIdentifiers.includes(generateArticleIdentifier(article)))

  const allArticles = updatedArticles.slice().concat(newArticles)

  const updatedFeed = Object.assign({}, original)
  updatedFeed.articles = allArticles
  updatedFeed.lastUpdate = latest.lastUpdate

  return updatedFeed
}

/// Checks for changes to existing articles in a feed, and updates the ones that have changed
function updateArticles(original: Feed, latest: Feed) {
  const latestIdentifiers = latest.articles.map(generateArticleIdentifier)

  const updatedArticles = original.articles.map(originalArticle => {
    const articleIdentifier = generateArticleIdentifier(originalArticle)

    if (!latestIdentifiers.includes(articleIdentifier)) return originalArticle

    const latestArticle = latest.articles[latestIdentifiers.indexOf(articleIdentifier)]

    const hasContentChanged = !((latestArticle.articleContent === originalArticle.articleContent)
      || (latestArticle.articleLink === originalArticle.articleLink))
    if (!hasContentChanged) return originalArticle

    const updatedArticle = Object.assign({}, originalArticle)
    updatedArticle.articleContent = latestArticle.articleContent
    updatedArticle.articleLink = latestArticle.articleLink

    return updatedArticle
  })

  return updatedArticles
}

function generateArticleIdentifier(article: Article): string {
  const title = article.articleTitle ? article.articleTitle : ''
  const description = article.articleDescription ? article.articleDescription : ''

  return btoa(`${title}+${description}`)
}

