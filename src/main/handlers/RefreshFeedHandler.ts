import { getCustomRepository } from "typeorm";
import Feed from "../database/entities/Feed";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";
import { refreshFeed } from "./utility";

export default class RefreshFeedHandler implements Handler<Feed> {
  async handle(feedId: number) {
    const feedRepository = getCustomRepository(FeedRepository)
    const feed = await feedRepository.getFeed(feedId)
    const updatedFeed = await refreshFeed(feed)
    const latestFeed = await feedRepository.save(updatedFeed)
    return latestFeed
  }
}