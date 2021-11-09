import { IsNull, Repository } from "typeorm";
import { Feed } from "../entities/Feed";

export default class FeedRepository extends Repository<Feed> {
  getAvailable(): Promise<Feed[]> {
    const availableFeeds = this.find({
      where: { deletedOn: IsNull() },
      relations: ['tag', 'articles']
    })
    return availableFeeds
  }
}
