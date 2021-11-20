import { RSS } from "../../rss/data";
import Article from "../entities/Article";

export type SimpleArticle = {
  id: number
  title: string
  description: string | null
  publishedDate: Date | null
  isRead: boolean
  isBookmark: boolean
}

export default class ArticleMapper {
  static fromRSSItem(item: RSS.Item): Article {
    const article = new Article()
    article.articleTitle = item.title
    article.articleDescription = item.description
    article.articleContent = item.content
    article.articleLink = item.link
    article.publishedDate = item.pubDate

    return article
  }

  static toRSSItem(article: Article): RSS.Item {
    return {
      title: article.articleTitle,
      link: article.articleLink,
      description: article.articleDescription,
      content: article.articleContent,
      pubDate: article.publishedDate,
      author: null,
      categories: [],
      comments: null,
      enclosure: null,
      guid: null
    }
  }

  static toSimple(article: Article): SimpleArticle {
    return {
      id: article.articleId,
      title: article.articleTitle,
      description: article.articleDescription,
      publishedDate: article.publishedDate,
      isRead: article.isRead,
      isBookmark: article.isBookmark
    }
  }
}