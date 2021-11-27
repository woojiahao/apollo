import { getCustomRepository } from "typeorm";
import FeedMapper, { SimpleFeed } from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";

export default class GetArticlesInFeedHandler implements Handler<SimpleFeed> {
  async handle(feedId: number) {
    /// TODO: Handle when feed ID is invalid
    const feed = await getCustomRepository(FeedRepository).getFeed(feedId)
    return FeedMapper.toSimple(feed)
  }
}