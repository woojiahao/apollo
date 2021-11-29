import { EntityRepository, IsNull, Raw, Repository } from "typeorm";
import Article from "../entities/Article";

@EntityRepository(Article)
export default class ArticleRepository extends Repository<Article> {
  getArticlesInFeed(feedId: number) {
    return this.find({
      where: {
        feed: {
          feedId: feedId
        },
        deletedOn: IsNull()
      }
    })
  }

  getArticle(articleId: number) {
    /// TODO: Add error handling if article not found
    return this.findOne({
      where: {
        articleId: articleId,
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
      this.save(updatedArticle)
    }
  }

  async bookmarkArticle(articleId: number, isBookmark: boolean) {
    const article = await this.getArticle(articleId)
    if (article !== null) {
      article.isBookmark = isBookmark
      return this.save(article)
    }
  }
}
