import { RSS } from "../../rss/data";
import { Article } from "../entities/Article";

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
}