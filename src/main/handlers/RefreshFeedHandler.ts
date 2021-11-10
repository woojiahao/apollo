import { getCustomRepository } from "typeorm";
import FeedMapper from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import { RSS } from "../rss/data";
import Handler from "./Handler";
import { refreshFeed } from "./utility";

export default class RefreshFeedHandler implements Handler<RSS.TagFeeds> {
  async handle(feedId: number) {
    const feedRepository = getCustomRepository(FeedRepository)
    const feed = await feedRepository.getFeed(feedId)
    const updatedFeed = await refreshFeed(feed)
    await feedRepository.save(updatedFeed)

    const feeds = await feedRepository.getAvailable()
    const tagFeeds = FeedMapper.toTagFeeds(feeds)
    return tagFeeds
  }
}