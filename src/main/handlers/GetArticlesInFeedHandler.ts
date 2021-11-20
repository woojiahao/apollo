import { getCustomRepository } from "typeorm";
import Article from "../database/entities/Article";
import ArticleMapper, { SimpleArticle } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import Handler from "./Handler";

export default class GetArticlesInFeedHandler implements Handler<SimpleArticle[]> {
  async handle(feedId: number) {
    /// TODO: Handl when feed ID is invalid
    const articles = await getCustomRepository(ArticleRepository).getArticlesInFeed(feedId)
    return articles.map(ArticleMapper.toSimple)
  }
}