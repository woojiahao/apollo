import { IsNull, Repository } from "typeorm";
import { Article } from "../entities/Article";

export default class ArticleRepository extends Repository<Article> {
  getArticle(articleId: number) {
    /// TODO: Add error handling if article not found
    return this.findOneOrFail({
      where: {
        articleId: articleId,
        deletedOn: IsNull()
      }
    })
  }
}
