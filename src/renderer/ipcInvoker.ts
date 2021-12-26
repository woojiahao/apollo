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


const loadFeed = (feedUrl: string) => invoke<RSS.Feed>('load-feed', feedUrl)
const getArticlesInFeed = (feedId: number) => invoke<FeedInformation>('get-articles-in-feed', feedId)
const bookmarkArticle = (articleId: number, isBookmark: boolean) => invoke<ArticleInformation>('bookmark-article', articleId, isBookmark)
const getArticle = (articleId: number) => invoke<RSS.Item>('get-article', articleId)
const getTags = () => invoke<string[]>('get-tags')
const getTagFeeds = () => invoke<TagFeeds>('get-tag-feeds')
// TODO: Experiment if two separate ipc calls create lag?
const addFeed = (rawFeed: RSS.Feed, feedUrl: string, tag: string | null) => invoke<FeedInformation>('add-feed', rawFeed, feedUrl, tag)
const refreshFeeds = () => invoke<TagFeeds>('refresh-feeds')
const refreshFeed = (feedId: number) => invoke<Feed>('refresh-feed', feedId)
const getToday = () => invoke<{ [feedTitle: string]: ArticleInformation[] }>('get-today')
const readArticle = (articleId: number) => invoke<TagFeeds>('read-article', articleId)
const readAllArticlesInFeed = (feedId: number) => invoke<ArticleInformation[]>('read-all-articles', feedId)
const getBookmarks = () => invoke<{ [feedTitle: string]: ArticleInformation[] }>('get-bookmarks')
const getFeed = (feedId: number) => invoke<FeedInformation>('get-feed', feedId)
const editFeed = (id: number, title: string, description: string, tag: string | undefined) => invoke<FeedInformation>('edit-feed', id, title, description, tag)

export {
  loadFeed,
  getArticlesInFeed,
  bookmarkArticle,
  getArticle,
  getTags,
  getTagFeeds,
  addFeed,
  refreshFeeds,
  refreshFeed,
  getToday,
  readArticle,
  readAllArticlesInFeed,
  getBookmarks,
  getFeed,
  editFeed
};

