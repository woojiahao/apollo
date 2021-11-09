import { getCustomRepository } from "typeorm";
import Article from "../database/entities/Article";
import ArticleMapper from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import { RSS } from "../rss/data";
import Handler from "./Handler";

export default class GetArticleHandler implements Handler<RSS.Item> {
  async handle(articleId: number) {
    const article = await getCustomRepository(ArticleRepository).getArticle(articleId)
    return ArticleMapper.toRSSItem(article)
  }
}