import { getCustomRepository } from "typeorm";
import Feed from "../database/entities/Feed";
import FeedRepository from "../database/repositories/FeedRepository";
import Handler from "./Handler";
import { refreshFeed } from "../utility";

export default class RefreshFeedHandler extends Handler<Feed> {
  constructor() {
    super('refresh-feed')
  }

  async handle(feedId: number) {
    const feedRepository = getCustomRepository(FeedRepository)
    const feed = await feedRepository.getFeedWithArticles(feedId)
    const updatedFeed = await refreshFeed(feed)
    const latestFeed = await feedRepository.save(updatedFeed)
    return latestFeed
  }
}