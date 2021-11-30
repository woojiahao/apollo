import { getCustomRepository } from "typeorm";
import Article from "../database/entities/Article";
import ArticleRepository from "../database/repositories/ArticleRepository";
import Handler from "./Handler";

export default class ReadAllArticlesInFeedHandler implements Handler<Article[]> {
  async handle(feedId: number) {
    const updatedArticles = await getCustomRepository(ArticleRepository).readAllInFeed(feedId)
    return updatedArticles
  }
}