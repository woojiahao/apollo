import { ipcMain } from "electron"
import { getConnection } from "typeorm"
import { Feed } from "./database/entities/Feed"
import { Tag } from "./database/entities/Tag"
import { loadFeed } from "./rss/rss"

export default function setupHandlers() {
  ipcMain.handle('add-feed', async (_e, feedUrl, tagName) => handleAddFeed(feedUrl, tagName))
  ipcMain.handle('get-tags', async (_e) => handleGetTags())
}


// TODO: Handle concurrent updates to the tag list
async function handleAddFeed(feedUrl: string, tagName: string | null) {
  const feedRepository = getConnection().getRepository(Feed)
  const tagRepository = getConnection().getRepository(Tag)

  const rawFeed = await loadFeed(feedUrl)

  const feed = new Feed()
  feed.feedTitle = rawFeed.title
  feed.feedDescription = rawFeed.description
  feed.feedUrl = rawFeed.link
  feed.lastUpdate = rawFeed.lastBuildDate

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

  const savedFeed = await feedRepository.save(feed)
  const updatedTags = (await tagRepository.find()).map(tag => tag.tagName)

  return { savedFeed, updatedTags }
}

async function handleGetTags(): Promise<string[]> {
  return (await getConnection().getRepository(Tag).find()).map(tag => tag.tagName)
}