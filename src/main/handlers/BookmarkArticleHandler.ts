import { getCustomRepository, getManager } from "typeorm";
import FeedMapper, { TagFeeds } from "../database/mappers/FeedMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";

export default class BookmarkArticleHandler implements Handler<TagFeeds> {
  async handle(articleId: number) {
    const articleRepository = getCustomRepository(ArticleRepository)
    await articleRepository.bookmarkArticle(articleId)

    const feeds = await getCustomRepository(FeedRepository).getAvailable()
    const tagFeeds = FeedMapper.toTagFeeds(feeds)
    return tagFeeds
  }
}