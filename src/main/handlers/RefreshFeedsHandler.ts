import { getCustomRepository } from "typeorm";
import Feed from "../database/entities/Feed";
import FeedMapper from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import { RSS } from "../rss/data";
import Handler from "./Handler";
import { refreshFeed } from "./utility";

export default class RefreshFeedsHandler implements Handler<RSS.TagFeeds> {
  async handle() {
    const feedRepository = getCustomRepository(FeedRepository)
    const availableFeeds = await feedRepository.getAvailable()
    const updatedFeeds = await Promise.all(availableFeeds.map(refreshFeed))
    const savedFeeds = await feedRepository.save(updatedFeeds)
    const tagFeeds = FeedMapper.toTagFeeds(savedFeeds)
    return tagFeeds
  }
}