import { getCustomRepository } from "typeorm";
import FeedRepository from "../database/repositories/FeedRepository";
import { refreshFeed } from "../utility";
import Handler from "../Handler";

export default class RefreshFeedsHandler extends Handler<void> {
  constructor() {
    super('refresh-feeds')
  }

  /// TODO: Make the refreshing task concurrent
  /// TODO: Watch out for instances where someone adds the same feed multiple times and tries to refresh all at once since that can be classified as a DDOS attack
  /// Solution is to refresh the base feeds once by finding the common ones and just retrieving once
  async handle() {
    const feedRepository = getCustomRepository(FeedRepository)
    const availableFeeds = await feedRepository.getAvailable()
    const updatedFeeds = await Promise.all(availableFeeds.map(refreshFeed))
    await feedRepository.save(updatedFeeds)
  }
}