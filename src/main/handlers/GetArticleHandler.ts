import { getCustomRepository } from "typeorm";
import ArticleMapper from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import { RSS } from "../rss/data";
import Handler from "../Handler";

export default class GetArticleHandler extends Handler<RSS.Item> {
  constructor() {
    super('get-article')
  }

  async handle(articleId: number) {
    const article = await getCustomRepository(ArticleRepository).getArticle(articleId)
    return ArticleMapper.toRSSItem(article)
  }
}