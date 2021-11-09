import { EntityRepository, IsNull, Repository } from "typeorm";
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
}
