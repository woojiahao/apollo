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
    const feedsInformation = feeds.map(f => this.information(f))
    const tagFeeds = groupBy(feedsInformation, 'tag')
    return tagFeeds
  }

  static information(feed: Feed): FeedInformation {
    return {
      id: feed.id,
      title: feed.title,
      description: feed.description ? feed.description : undefined,
      articles: groupBy(feed.articles.map(ArticleMapper.toSimple), 'publishedDate'),
      tag: feed.tag ? feed.tag.name : 'Uncategorized'
    }
  }
}