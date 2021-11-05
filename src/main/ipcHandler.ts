import { ipcMain } from "electron"
import { getConnection } from "typeorm"
import { Article } from "./database/entities/Article"
import { Feed } from "./database/entities/Feed"
import { Tag } from "./database/entities/Tag"
import { getAvailableFeedsToTagFeeds } from "./database/repositories/feedRepository"
import { RSS } from "./rss/data"
import { loadFeed } from "./rss/rss"

export default function setupHandlers() {
  ipcMain.handle('add-feed', async (_e, feedUrl, tagName) => handleAddFeed(feedUrl, tagName))
  ipcMain.handle('get-tags', async (_e) => handleGetTags())
  ipcMain.handle('get-tag-feeds', async (_e) => handleGetTagFeeds())
}


// TODO: Handle concurrent updates to the tag list
// TODO: Abstract any database operations to a dedicated file, so this can act as a controller
async function handleAddFeed(
  feedUrl: string,
  tagName: string | null): Promise<Feed> {
  const feedRepository = getConnection().getRepository(Feed)
  const tagRepository = getConnection().getRepository(Tag)

  const rawFeed = await loadFeed(feedUrl)

  const feed = new Feed()
  feed.rssUrl = feedUrl
  feed.feedTitle = rawFeed.title
  feed.feedDescription = rawFeed.description
  feed.feedUrl = rawFeed.link
  feed.lastUpdate = rawFeed.lastBuildDate
  feed.articles = rawFeed.items.map(item => {
    const article = new Article()
    article.articleTitle = item.title
    article.articleDescription = item.description
    article.articleContent = item.content
    article.articleLink = item.link
    article.publishedDate = item.pubDate

    return article
  })

  if (tagName) {
    let tag = await tagRepository.findOne({ where: { tagName: tagName } })
    if (!tag) {
      // Tag does not exist in DB yet
      tag = new Tag()
      tag.tagName = tagName
      tag.feeds = []
      tag = await tagRepository.save(tag)
    }
    feed.tag = tag
  }

  const newFeed = await feedRepository.save(feed)

  return newFeed
}

async function handleGetTags(): Promise<string[]> {
  return (await getConnection().getRepository(Tag).find()).map(tag => tag.tagName)
}

async function handleGetTagFeeds(): Promise<RSS.TagFeeds> {
  return await getAvailableFeedsToTagFeeds()
}