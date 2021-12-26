import { getCustomRepository } from "typeorm";
import FeedMapper, { FeedInformation } from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import TagRepository from "../database/repositories/TagRepository";
import FeedExistsError from "../errors/FeedExistsError";
import Handler from "../Handler";
import { RSS } from "../rss/data";

export default class AddFeedHandler extends Handler<FeedInformation> {
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

    return FeedMapper.information(newFeed)
  }
}