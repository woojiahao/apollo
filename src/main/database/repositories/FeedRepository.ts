import { EntityRepository, getCustomRepository, IsNull, Repository } from "typeorm";
import Feed from "../entities/Feed";

@EntityRepository(Feed)
export default class FeedRepository extends Repository<Feed> {
  /// Retrieves the available articles, prioritizing unread articles first
  getAvailable(): Promise<Feed[]> {
    const availableFeeds = this
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.articles', 'article')
      .leftJoinAndSelect('feed.tag', 'tag')
      .where('feed.deletedOn is null')
      .orderBy('article.isRead')
      .addOrderBy('article.id', 'ASC')
      .getMany()
    return availableFeeds
  }

  getFeed(feedId: number): Promise<Feed> {
    return this.findOne({
      where: {
        id: feedId,
        deletedOn: IsNull()
      },
      relations: ['tag']
    })
  }

  getFeedWithArticles(feedId: number): Promise<Feed> {
    /// TODO: Handle no feed match
    const feed = this
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.articles', 'article')
      .where('feed.deletedOn is null')
      .andWhere('feed.id = :feedId', { feedId })
      .orderBy('article.publishedDate', 'DESC')
      .addOrderBy('article.id', 'ASC')
      .getOne()
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
