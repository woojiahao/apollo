import { getCustomRepository } from "typeorm";
import FeedMapper, { TagFeeds } from "../database/mappers/FeedMapper";
import ArticleRepository from "../database/repositories/ArticleRepository";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";

export default class ReadArticleHandler implements Handler<TagFeeds> {
  async handle(articleId: number) {
    const articleRepository = getCustomRepository(ArticleRepository)
    const feedRepository = getCustomRepository(FeedRepository)
    await articleRepository.readArticle(articleId)

    const feeds = await feedRepository.getAvailable()
    const tagFeeds = FeedMapper.toTagFeeds(feeds)
    return tagFeeds
  }
}