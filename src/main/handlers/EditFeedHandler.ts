import { getCustomRepository } from "typeorm";
import Feed from "../database/entities/Feed";
import FeedMapper, { SimpleFeed } from "../database/mappers/FeedMapper";
import FeedRepository from "../database/repositories/FeedRepository";
import TagRepository from "../database/repositories/TagRepository";
import Handler from "../Handler";

export default class EditFeedHandler extends Handler<SimpleFeed> {
  constructor() {
    super('edit-feed')
  }

  async handle(id: number, title: string, description: string, tag: string | undefined) {
    const feedRepository = getCustomRepository(FeedRepository)
    const feed = await feedRepository.getFeed(id)
    feed.title = title
    feed.description = description

    if (tag) {
      const t = await getCustomRepository(TagRepository).createIfNotExists(tag)
      feed.tag = t
    }

    const updatedFeed = await feedRepository.save(feed)
    return FeedMapper.toSimple(updatedFeed)
  }
}