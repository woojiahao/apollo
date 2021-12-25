import { RSS } from "../rss/data";
import { loadFeed } from "../rss/rss";
import Handler from "./Handler";

export default class LoadFeedHandler extends Handler<RSS.Feed> {
  constructor() {
    super('load-feed')
  }

  handle(feedUrl: string) {
    return loadFeed(feedUrl)
  }
}