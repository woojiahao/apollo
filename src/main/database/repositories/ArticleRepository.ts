import { EntityRepository, IsNull, Raw, Repository } from "typeorm";
import Article from "../entities/Article";

@EntityRepository(Article)
export default class ArticleRepository extends Repository<Article> {
  getArticle(articleId: number) {
    /// TODO: Add error handling if article not found
    return this.findOne({
      where: {
        articleId: articleId,
        deletedOn: IsNull()
      }
    })
  }

  getToday() {
    /// Returns today's articles
    return this.find({
      where: {
        publishedDate: Raw((alias) => `date_trunc('day', ${alias}) = current_date`),
        deletedOn: IsNull()
      }
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
}
