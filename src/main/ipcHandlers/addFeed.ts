import { getConnection } from 'typeorm'
import { Feed } from '../database/entities/Feed'
import { Tag } from '../database/entities/Tag'
import { loadFeed } from '../rss/rss'

export default async function handleAddFeed(feedUrl: string, tagName: string | null) {
  const rawFeed = await loadFeed(feedUrl)

  const feed = new Feed()
  feed.feedTitle = rawFeed.title
  feed.feedDescription = rawFeed.description
  feed.feedUrl = rawFeed.link
  feed.lastUpdate = rawFeed.lastBuildDate

  if (tagName) {
    const tagRepository = getConnection().getRepository(Tag)
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

  return getConnection().getRepository(Feed).save(feed)
}