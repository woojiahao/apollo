import { RSS } from "../rss/data";
import { loadFeed } from "../rss/rss";
import Handler from "./Handler";

export default class LoadFeedHandler implements Handler<RSS.Feed> {
  handle(feedUrl: string) {
    return loadFeed(feedUrl)
  }
}