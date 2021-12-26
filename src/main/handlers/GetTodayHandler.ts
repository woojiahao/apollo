import { getCustomRepository } from "typeorm";
import ArticleMapper, { ArticleInformation } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import { groupBy } from "../utility";
import Handler from "../Handler";

export default class GetTodayHandler extends Handler<{ [feedTitle: string]: ArticleInformation[] }>  {
  constructor() {
    super('get-today')
  }

  async handle() {
    const articleRepository = getCustomRepository(ArticleRepository)
    const today = await articleRepository.getToday()
    const simpleArticles = today.map(ArticleMapper.toSimple)
    const grouped = groupBy(simpleArticles, 'feedTitle')
    return grouped
  }
}