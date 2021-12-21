import { groupBy } from "../../utility";
import { RSS } from "../../rss/data";
import Feed from "../entities/Feed";
import ArticleMapper, { SimpleArticle } from "./ArticleMapper";

export type TagFeeds = {
  [tag: string]: {
    id: number
    title: string
  }[]
}

export type SimpleFeed = {
  id: number
  title: string
  description: string | null
  articles: { [publishedDate: string]: SimpleArticle[] }
}

export type FeedCore = {
  id: number
  title: string
  description: string | null
  tag: string | undefined
}

export default class FeedMapper {
  static fromRSSFeed(rssFeed: RSS.Feed, rssUrl: string): Feed {
    const feed = new Feed()
    feed.rssUrl = rssUrl
    feed.title = rssFeed.title
    feed.description = rssFeed.description
    feed.url = rssFeed.link
    feed.lastUpdate = rssFeed.lastBuildDate
    feed.articles = rssFeed.items.map(item => ArticleMapper.fromRSSItem(item))

    return feed
  }

  static toTagFeeds(feeds: Feed[]): TagFeeds {
    const tagFeeds: TagFeeds = {}

    for (const f of feeds) {
      const tag = !f.tag ? 'Uncategorized' : f.tag.name
      const feedTitle = f.title
      if (!(tag in tagFeeds)) tagFeeds[tag] = []

      tagFeeds[tag].push({
        id: f.id,
        title: feedTitle
      })
    }

    if (!('Uncategorized' in tagFeeds)) {
      tagFeeds['Uncategorized'] = []
    }

    return tagFeeds
  }

  static toSimple(feed: Feed): SimpleFeed {
    return {
      id: feed.id,
      title: feed.title,
      description: feed.description,
      articles: groupBy(feed.articles.map(ArticleMapper.toSimple), 'publishedDate')
    }
  }

  static toCore(feed: Feed): FeedCore {
    return {
      id: feed.id,
      title: feed.title,
      description: feed.description,
      tag: feed.tag ? feed.tag.name : undefined
    }
  }
}