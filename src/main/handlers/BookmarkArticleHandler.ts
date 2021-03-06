import { getCustomRepository } from "typeorm";
import ArticleMapper, { ArticleInformation } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import Handler from "../Handler";

export default class BookmarkArticleHandler extends Handler<ArticleInformation> {
  constructor() {
    super('bookmark-article')
  }

  async handle(articleId: number, isBookmark: boolean) {
    const articleRepository = getCustomRepository(ArticleRepository)
    const article = await articleRepository.bookmarkArticle(articleId, isBookmark)
    return ArticleMapper.information(article)
  }
}