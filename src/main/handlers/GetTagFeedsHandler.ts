
import { getCustomRepository } from "typeorm";
import FeedMapper from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import { RSS } from "../rss/data";
import Handler from "./Handler";

export default class GetTagFeedsHandler implements Handler<RSS.TagFeeds> {
  async handle() {
    const feeds = await getCustomRepository(FeedRepository).getAvailable()
    return FeedMapper.toTagFeeds(feeds)
  }
}
