import { EntityRepository, IsNull, Raw, Repository } from "typeorm";
import Article from "../entities/Article";

@EntityRepository(Article)
export default class ArticleRepository extends Repository<Article> {
  getArticlesInFeed(feedId: number) {
    return this.find({
      where: {
        feed: {
          id: feedId
        },
        deletedOn: IsNull()
      }
    })
  }

  getArticle(articleId: number) {
    /// TODO: Add error handling if article not found
    return this.findOne({
      where: {
        id: articleId,
        deletedOn: IsNull()
      },
      relations: ['feed']
    })
  }

  getToday() {
    /// Returns today's articles
    return this.find({
      where: {
        publishedDate: Raw((alias) => `date_trunc('day', ${alias}) = current_date`),
        deletedOn: IsNull()
      },
      relations: ['feed']
    })
  }

  async readArticle(articleId: number) {
    const article = await this.getArticle(articleId)
    if (article !== null) {
      const updatedArticle = Object.assign({}, article)
      updatedArticle.isRead = true
      return this.save(updatedArticle)
    }
  }

  async readAllInFeed(feedId: number) {
    const articles = await this.find({
      where: {
        feed: {
          id: feedId,
          deletedOn: IsNull()
        },
        deletedOn: IsNull()
      }
    })

    for (const a of articles) {
      a.isRead = true
    }

    return this.save(articles)
  }

  async bookmarkArticle(articleId: number, isBookmark: boolean) {
    const article = await this.getArticle(articleId)
    if (article !== null) {
      article.isBookmark = isBookmark
      return this.save(article)
    }
  }

  async getBookmarks() {
    const bookmarks = await this.find({
      where: {
        isBookmark: true,
        deletedOn: IsNull()
      },
      relations: ['feed']
    })
    return bookmarks
  }
}
