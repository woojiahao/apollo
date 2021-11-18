import { EntityRepository, IsNull, Repository } from "typeorm";
import Feed from "../entities/Feed";

@EntityRepository(Feed)
export default class FeedRepository extends Repository<Feed> {
  getAvailable(): Promise<Feed[]> {
    const availableFeeds = this.find({
      where: { deletedOn: IsNull() },
      relations: ['tag', 'articles']
    })
    return availableFeeds
  }

  getFeed(feedId: number): Promise<Feed> {
    const feed = this.findOne({
      where: {
        deletedOn: IsNull(),
        feedId: feedId
      },
      relations: ['tag', 'articles']
    })
    return feed
  }

  async hasFeed(rssUrl: string): Promise<boolean> {
    const [_, feedCount] = await this.findAndCount({
      where: {
        deletedOn: IsNull(),
        rssUrl: rssUrl
      }
    })
    return feedCount > 0
  }
}
