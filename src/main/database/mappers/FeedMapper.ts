import { RSS } from "../../rss/data";
import { groupBy } from "../../utility";
import Feed from "../entities/Feed";
import ArticleMapper, { ArticleInformation, SimpleArticle } from "./ArticleMapper";

export type TagFeeds = {
  [tag: string]: FeedInformation[]
}

export interface FeedInformation {
  id: number
  title: string
  description: string | undefined
  tag: string
  articles: { [publishedDate: string]: ArticleInformation[] }
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
    const feedsInformation = feeds.map(f => this.toFeedInformation(f))
    const tagFeeds = groupBy(feedsInformation, 'tag')
    return tagFeeds
  }

  static toFeedInformation(feed: Feed): FeedInformation {
    return {
      id: feed.id,
      title: feed.title,
      description: feed.description ? feed.description : undefined,
      articles: groupBy(feed.articles.map(ArticleMapper.toSimple), 'publishedDate'),
      tag: feed.tag ? feed.tag.name : 'Uncategorized'
    }
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