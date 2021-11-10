
import { getCustomRepository } from "typeorm";
import FeedMapper from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import { TagFeeds } from "../database/mappers/FeedMapper"
import Handler from "./Handler";

export default class GetTagFeedsHandler implements Handler<TagFeeds> {
  async handle() {
    const feeds = await getCustomRepository(FeedRepository).getAvailable()
    return FeedMapper.toTagFeeds(feeds)
  }
}
