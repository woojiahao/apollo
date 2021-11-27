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
      .addOrderBy('article.articleId', 'ASC')
      .getMany()
    return availableFeeds
  }

  getFeed(feedId: number): Promise<Feed> {
    /// TODO: Handle no feed match
    const feed = this
      .createQueryBuilder('feed')
      .innerJoinAndSelect('feed.articles', 'article')
      .where('feed.deletedOn is null')
      .andWhere('feed.feedId = :feedId', { feedId })
      .orderBy('article.publishedDate', 'DESC')
      .addOrderBy('article.articleId', 'ASC')
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
