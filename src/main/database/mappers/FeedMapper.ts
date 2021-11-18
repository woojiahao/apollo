import { RSS } from "../../rss/data";
import Feed from "../entities/Feed";
import ArticleMapper, { SimpleArticle } from "./ArticleMapper";

export type TagFeeds = {
  [tag: string]: {
    feedId: number
    feedTitle: string
    rssUrl: string
    articles: SimpleArticle[]
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
      const rssUrl = f.rssUrl
      if (!(tag in tagFeeds)) {
        tagFeeds[tag] = []
      }

      const simplifiedArticles = f.articles.map(a => {
        return {
          articleTitle: a.articleTitle,
          articleId: a.articleId,
          isRead: a.isRead,
          isBookmark: a.bookmark !== null
        }
      })

      tagFeeds[tag].push({
        feedId: f.feedId,
        feedTitle,
        rssUrl,
        articles: simplifiedArticles
      })
    }

    if (!('Uncategorized' in tagFeeds)) {
      tagFeeds['Uncategorized'] = []
    }

    return tagFeeds
  }
}