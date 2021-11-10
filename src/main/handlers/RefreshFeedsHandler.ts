import { getCustomRepository } from "typeorm";
import FeedMapper, { TagFeeds } from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";
import { refreshFeed } from "./utility";

export default class RefreshFeedsHandler implements Handler<TagFeeds> {
  async handle() {
    const feedRepository = getCustomRepository(FeedRepository)
    const availableFeeds = await feedRepository.getAvailable()
    const updatedFeeds = await Promise.all(availableFeeds.map(refreshFeed))
    await feedRepository.save(updatedFeeds)

    const feeds = await feedRepository.getAvailable()
    const tagFeeds = FeedMapper.toTagFeeds(feeds)
    return tagFeeds
  }
}