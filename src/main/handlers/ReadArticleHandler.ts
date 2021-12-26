import { getCustomRepository } from "typeorm";
import ArticleRepository from "../database/repositories/ArticleRepository";
import Handler from "../Handler";

export default class ReadArticleHandler extends Handler<void> {
  constructor() {
    super('read-article')
  }

  async handle(articleId: number) {
    const articleRepository = getCustomRepository(ArticleRepository)
    await articleRepository.readArticle(articleId)
  }
}