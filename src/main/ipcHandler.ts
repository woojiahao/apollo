import { ipcMain } from "electron"
import { getConnection, getCustomRepository } from "typeorm"
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
  ipcMain.handle('get-feed', async (_e, feedUrl) => handleGetFeed(feedUrl))
  ipcMain.handle('get-article', async (_e, articleId) => handleGetArticle(articleId))
  ipcMain.handle('add-feed', async (_e, rawFeed, feedUrl, tagName) => handleAddFeed(rawFeed, feedUrl, tagName))
  ipcMain.handle('get-tags', async (_e) => handleGetTags())
  ipcMain.handle('get-tag-feeds', async (_e) => handleGetTagFeeds())
  ipcMain.handle('refresh-feeds', async (_e) => handleRefreshFeeds())
}

// TODO: Experiement with sending this to separate thread
async function handleGetFeed(feedUrl: string): Promise<RSS.Feed> {
  const feed = await loadFeed(feedUrl)
  return feed
}

async function handleGetArticle(articleId: number): Promise<RSS.Item> {
  const article = await getCustomRepository(ArticleRepository).getArticle(articleId)
  return ArticleMapper.toRSSItem(article)
}


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

async function handleGetTags(): Promise<string[]> {
  const tags = await getCustomRepository(TagRepository).getAvailable()
  return tags.map(tag => tag.tagName)
}

async function handleGetTagFeeds(): Promise<RSS.TagFeeds> {
  const availableFeeds = await getCustomRepository(FeedRepository).getAvailable()
  const tagFeeds = FeedMapper.toTagFeeds(availableFeeds)
  return tagFeeds
}

async function handleRefreshFeeds(): Promise<RSS.TagFeeds> {
  /// Get all non-deleted feeds 
  const availableFeeds = await getCustomRepository(FeedRepository).getAvailable()
  const updatedFeeds = []

  /// Compare old feed published date to the new feed published date
  for (let i = 0; i < availableFeeds.length; i++) {
    const original = availableFeeds[i]

    /// Fetch feed again
    const latest: RSS.Feed = await loadFeed(original.rssUrl)
    if ((latest.lastBuildDate && original.lastUpdate) && !(latest.lastBuildDate.getTime() > original.lastUpdate.getTime())) continue

    console.log(`updating ${original.feedTitle}`)

    /// Update existing articles
    const latestIdentifiers = latest.items.map(item => generateArticleIdentifier(item))

    const existingArticles = original
      .articles
      .map(article => {
        const articleIdentifier = generateArticleIdentifier(article)

        if (!latestIdentifiers.includes(articleIdentifier)) return article

        const latestArticle = latest.items[latestIdentifiers.indexOf(articleIdentifier)]

        if (latestArticle.content === article.articleContent) return article
        if (latestArticle.link === article.articleLink) return article

        const updatedArticle = Object.assign({}, article)
        /// TODO: Handle the case where the title and descriptions are exactly the same
        updatedArticle.articleContent = latestArticle.content
        updatedArticle.articleLink = latestArticle.link

        return updatedArticle
      })

    /// Add new articles
    const originalIdentifiers = original.articles.map(article => generateArticleIdentifier(article))

    const newArticles = latest
      .items
      .filter(item => !originalIdentifiers.includes(generateArticleIdentifier(item)))
      .map(item => ArticleMapper.fromRSSItem(item))

    const updatedArticles = existingArticles.slice().concat(newArticles)

    const updatedFeed = Object.assign({}, original)
    updatedFeed.articles = updatedArticles
    updatedFeed.lastUpdate = latest.lastBuildDate

    updatedFeeds.push(updatedFeed)
  }

  const feedRepository = getConnection().getRepository(Feed)
  await feedRepository.save(updatedFeeds)

  /// Refetch the tag feeds
  return await getAvailableFeedsToTagFeeds()
}

function generateArticleIdentifier(article: RSS.Item | Article): string {
  let title = ''
  let description = ''

  if (article instanceof Article) {
    title = article.articleTitle ? article.articleTitle : ''
    description = article.articleDescription ? article.articleDescription : ''
  } else {
    title = article.title ? article.title : ''
    description = article.description ? article.description : ''
  }

  const identifier = btoa(`${title}+${description}`)
  return identifier
}

