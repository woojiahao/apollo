import { getCustomRepository } from "typeorm";
import FeedMapper, { FeedInformation } from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "../Handler";

export default class GetArticlesInFeedHandler extends Handler<FeedInformation> {
  constructor() {
    super('get-articles-in-feed')
  }
  async handle(feedId: number) {
    /// TODO: Handle when feed ID is invalid
    const feed = await getCustomRepository(FeedRepository).getFeedWithArticles(feedId)
    return FeedMapper.information(feed)
  }
}