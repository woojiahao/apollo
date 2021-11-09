import { RSS } from "../rss/data";
import { loadFeed } from "../rss/rss";
import Handler from "./Handler";

export default class GetFeedHandler implements Handler<RSS.Feed> {
  handle(feedUrl: string) {
    return loadFeed(feedUrl)
  }
}