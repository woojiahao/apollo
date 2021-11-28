import { getCustomRepository } from "typeorm";
import ArticleMapper, { SimpleArticle } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import { groupBy } from "../utility";
import Handler from "./Handler";

export default class GetTodayHandler implements Handler<{ [feedTitle: string]: SimpleArticle[] }>  {
  async handle() {
    const articleRepository = getCustomRepository(ArticleRepository)
    const today = await articleRepository.getToday()
    const simpleArticles = today.map(ArticleMapper.toSimple)
    const grouped = groupBy(simpleArticles, 'feedTitle')
    return grouped
  }
}