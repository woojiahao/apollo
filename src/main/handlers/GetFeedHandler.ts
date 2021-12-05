import { getCustomRepository } from "typeorm";
import FeedMapper, { FeedCore } from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";

export default class GetFeedHandler implements Handler<FeedCore> {
  async handle(feedId: number) {
    const feed = await getCustomRepository(FeedRepository).getFeed(feedId)
    return FeedMapper.toCore(feed)
  }
}