import Article from "../database/entities/Article"
import Feed from "../database/entities/Feed"
import FeedMapper from "../database/mappers/FeedMapper"
import { loadFeed } from "../rss/rss"

/// Refreshes a single feed
export async function refreshFeed(original: Feed) {
  /// Fetch feed again
  const latest = FeedMapper.fromRSSFeed(await loadFeed(original.rssUrl), original.rssUrl)
  const hasChange = (latest.lastUpdate && original.lastUpdate)
    && (latest.lastUpdate.getTime() > original.lastUpdate.getTime())
  if (!hasChange) return original

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
