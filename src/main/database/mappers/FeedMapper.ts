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
        id: f.feedId,
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
      id: feed.feedId,
      title: feed.feedTitle,
      description: feed.feedDescription,
      articles: groupBy(feed.articles.map(ArticleMapper.toSimple), 'publishedDate')
    }
  }

  static toCore(feed: Feed): FeedCore {
    return {
      id: feed.feedId,
      title: feed.feedTitle,
      description: feed.feedDescription,
      tag: feed.tag ? feed.tag.tagName : undefined
    }
  }
}