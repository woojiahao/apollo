import { getCustomRepository } from "typeorm";
import ArticleMapper, { SimpleArticle } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import Handler from "./Handler";

export default class GetTodayHandler implements Handler<SimpleArticle[]>  {
  async handle() {
    const articleRepository = getCustomRepository(ArticleRepository)
    const today = await articleRepository.getToday()
    return today.map(ArticleMapper.toSimple)
  }
}