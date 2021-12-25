import { getCustomRepository } from "typeorm";
import ArticleMapper, { SimpleArticle } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import Handler from "./Handler";

export default class BookmarkArticleHandler extends Handler<SimpleArticle> {
  constructor() {
    super('bookmark-article')
  }

  async handle(articleId: number, isBookmark: boolean) {
    const articleRepository = getCustomRepository(ArticleRepository)
    const article = await articleRepository.bookmarkArticle(articleId, isBookmark)
    return ArticleMapper.toSimple(article)
  }
}