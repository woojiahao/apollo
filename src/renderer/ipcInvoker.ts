/**
 * Uses ipc to send asynchronous messages to the main thread
 */

import { ipcRenderer } from "electron";
import Feed from "../main/database/entities/Feed";
import { ArticleInformation } from "../main/database/mappers/ArticleMapper";
import { FeedInformation, TagFeeds } from "../main/database/mappers/FeedMapper";
import { RSS } from "../main/rss/data";

async function invoke<T>(action: string, ...args: any[]): Promise<T> {
  const result: T | Error = await ipcRenderer.invoke(action, ...args)
  if (result instanceof Error) throw result
  return result as T
}

module.exports = {
  loadFeed: (feedUrl: string) => invoke<RSS.Feed>('load-feed', feedUrl),
  getArticlesInFeed: (feedId: number) => invoke<FeedInformation>('get-articles-in-feed', feedId),
  bookmarkArticle: (articleId: number, isBookmark: boolean) => invoke<ArticleInformation>('bookmark-article', articleId, isBookmark),
  getArticle: (articleId: number) => invoke<RSS.Item>('get-article', articleId),
  getTags: () => invoke<string[]>('get-tags'),
  getTagFeeds: () => invoke<TagFeeds>('get-tag-feeds'),
  // TODO: Experiment if two separate ipc calls create lag?,
  addFeed: (rawFeed: RSS.Feed, feedUrl: string, tagName: string | null) => invoke<FeedInformation>('add-feed', rawFeed, feedUrl, tagName),
  refreshFeeds: () => invoke<TagFeeds>('refresh-feeds'),
  refreshFeed: (feedId: number) => invoke<Feed>('refresh-feed', feedId),
  getToday: () => invoke<{ [feedTitle: string]: ArticleInformation[] }>('get-today'),
  readArticle: (articleId: number) => invoke<TagFeeds>('read-article', articleId),
  readAllArticlesInFeed: (feedId: number) => invoke<ArticleInformation[]>('read-all-articles', feedId),
  getBookmarks: () => invoke<{ [feedTitle: string]: ArticleInformation[] }>('get-bookmarks'),
  getFeed: (feedId: number) => invoke<FeedInformation>('get-feed', feedId),
  editFeed: (id: number, title: string, description: string, tag: string | undefined) => invoke<FeedInformation>('edit-feed', id, title, description, tag),
}
