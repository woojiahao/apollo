import { getCustomRepository } from "typeorm";
import Feed from "../database/entities/Feed";
import FeedMapper from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import TagRepository from "../database/repositories/TagRepository";
import FeedExistsError from "../errors/FeedExistsError";
import { RSS } from "../rss/data";
import Handler from "./Handler";

export default class AddFeedHandler extends Handler<Feed> {
  constructor() {
    super('add-feed')
  }

  async handle(rawFeed: RSS.Feed, feedUrl: string, tagName: string | null) {
    const feedRepository = getCustomRepository(FeedRepository)
    const hasFeed = await feedRepository.hasFeed(feedUrl)

    if (hasFeed) throw new FeedExistsError()

    const feed = FeedMapper.fromRSSFeed(rawFeed, feedUrl)

    if (tagName) {
      const tag = await getCustomRepository(TagRepository).createIfNotExists(tagName)
      feed.tag = tag
    }

    const newFeed = await getCustomRepository(FeedRepository).save(feed)

    return newFeed
  }
}