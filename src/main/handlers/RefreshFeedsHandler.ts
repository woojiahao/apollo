import { getCustomRepository } from "typeorm";
import Feed from "../database/entities/Feed";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";
import { refreshFeed } from "./utility";

export default class RefreshFeedsHandler implements Handler<Feed[]> {
  async handle() {
    const feedRepository = getCustomRepository(FeedRepository)
    const availableFeeds = await feedRepository.getAvailable()
    const updatedFeeds = await Promise.all(availableFeeds.map(refreshFeed))
    return feedRepository.save(updatedFeeds)
  }
}