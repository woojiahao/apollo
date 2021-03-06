import { getCustomRepository } from "typeorm";
import ArticleMapper, { ArticleInformation } from "../database/mappers/ArticleMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import { groupBy } from "../utility";
import Handler from "../Handler";

export default class GetBookmarksHandler extends Handler<{ [feedTitle: string]: ArticleInformation[] }> {
  constructor() {
    super('get-bookmarks')
  }

  async handle() {
    const bookmarks = await getCustomRepository(ArticleRepository).getBookmarks()
    const simpleArticles = bookmarks.map(ArticleMapper.information)
    const grouped = groupBy(simpleArticles, 'feedTitle')
    return grouped
  }
}
