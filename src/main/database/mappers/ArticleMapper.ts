import { RSS } from "../../rss/data";
import { formatDate } from "../../utility";
import Article from "../entities/Article";

export interface ArticleInformation {
  id: number
  title: string
  description: string | undefined
  publishedDate: string
  isRead: boolean
  isBookmark: boolean
  feedTitle: string
  feedId: number
}

export default class ArticleMapper {
  static fromRSSItem(item: RSS.Item): Article {
    const article = new Article()
    article.title = item.title
    article.description = item.description
    article.content = item.content
    article.link = item.link
    article.publishedDate = item.pubDate

    return article
  }

  static toRSSItem(article: Article): RSS.Item {
    return {
      title: article.title,
      link: article.link,
      description: article.description,
      content: article.content,
      pubDate: article.publishedDate,
      author: null,
      categories: [],
      comments: null,
      enclosure: null,
      guid: null
    }
  }

  static information(article: Article): ArticleInformation {
    return {
      id: article.id,
      title: article.title,
      description: article.description ? article.description : undefined,
      publishedDate: article.publishedDate ? formatDate(article.publishedDate) : 'No Published Date',
      isRead: article.isRead,
      isBookmark: article.isBookmark,
      feedTitle: article.feed ? article.feed.title : '',
      feedId: article.feed ? article.feed.id : -1
    }
  }
}