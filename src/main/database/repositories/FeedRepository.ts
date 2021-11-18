import { EntityRepository, IsNull, Repository } from "typeorm";
import Feed from "../entities/Feed";

@EntityRepository(Feed)
export default class FeedRepository extends Repository<Feed> {
  /// Retrieves the available articles, prioritizing unread articles first
  getAvailable(): Promise<Feed[]> {
    const availableFeeds = this
      .createQueryBuilder('feed')
      .innerJoinAndSelect('feed.articles', 'article')
      .innerJoinAndSelect('feed.tag', 'tag')
      .where('feed.deletedOn is null')
      .orderBy('article.isRead')
      .addOrderBy('article.publishedDate')
      .getMany()
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
