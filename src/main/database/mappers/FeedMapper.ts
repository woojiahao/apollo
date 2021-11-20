import { RSS } from "../../rss/data";
import Feed from "../entities/Feed";
import ArticleMapper from "./ArticleMapper";

export type TagFeeds = {
  [tag: string]: {
    feedId: number
    feedTitle: string
  }[]
}

export default class FeedMapper {
  static fromRSSFeed(rssFeed: RSS.Feed, rssUrl: string): Feed {
    const feed = new Feed()
    feed.rssUrl = rssUrl
    feed.feedTitle = rssFeed.title
    feed.feedDescription = rssFeed.description
    feed.feedUrl = rssFeed.link
    feed.lastUpdate = rssFeed.lastBuildDate
    feed.articles = rssFeed.items.map(item => ArticleMapper.fromRSSItem(item))

    return feed
  }

  static toTagFeeds(feeds: Feed[]): TagFeeds {
    const tagFeeds: TagFeeds = {}

    for (const f of feeds) {
      const tag = !f.tag ? 'Uncategorized' : f.tag.tagName
      const feedTitle = f.feedTitle
      if (!(tag in tagFeeds)) tagFeeds[tag] = []

      tagFeeds[tag].push({
        feedId: f.feedId,
        feedTitle
      })
    }

    if (!('Uncategorized' in tagFeeds)) {
      tagFeeds['Uncategorized'] = []
    }

    return tagFeeds
  }
}