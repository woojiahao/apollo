import { getCustomRepository } from "typeorm";
import Article from "../database/entities/Article";
import ArticleMapper, { ArticleInformation } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import Handler from "../Handler";

export default class ReadAllArticlesInFeedHandler extends Handler<ArticleInformation[]> {
  constructor() {
    super('read-all-articles')
  }

  async handle(feedId: number) {
    const updatedArticles = await getCustomRepository(ArticleRepository).readAllInFeed(feedId)
    return updatedArticles.map(ArticleMapper.information)
  }
}