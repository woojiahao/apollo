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

export function loadFeed(feedUrl: string): Promise<RSS.Feed> {
  return invoke('load-feed', feedUrl)
}

export function getArticlesInFeed(feedId: number) {
  return invoke<FeedInformation>('get-articles-in-feed', feedId)
}

export async function bookmarkArticle(articleId: number, isBookmark: boolean): Promise<ArticleInformation> {
  return invoke('bookmark-article', articleId, isBookmark)
}

export async function getArticle(articleId: number): Promise<RSS.Item> {
  const article: RSS.Item = await invoke('get-article', articleId)
  return article
}

export async function getTags(): Promise<string[]> {
  const results: string[] = await invoke('get-tags')
  return results
}

export async function getTagFeeds(): Promise<TagFeeds> {
  const tagFeeds: TagFeeds = await invoke('get-tag-feeds')
  return tagFeeds
}

export function addFeed(rawFeed: RSS.Feed, feedUrl: string, tagName: string | null): Promise<Feed> {
  // TODO: Experiment if two separate ipc calls create lag?
  return invoke('add-feed', rawFeed, feedUrl, tagName)
}

export function refreshFeeds(): Promise<TagFeeds> {
  return invoke('refresh-feeds')
}

export function refreshFeed(feedId: number) {
  return invoke<Feed>('refresh-feed', feedId)
}

export async function getToday() {
  return invoke<{ [feedTitle: string]: ArticleInformation[] }>('get-today')
}

export async function readArticle(articleId: number) {
  const updatedTagFeeds = await invoke<TagFeeds>('read-article', articleId)
  return updatedTagFeeds
}

export async function readAllArticlesInFeed(feedId: number) {
  await invoke('read-all-articles', feedId)
}

export async function getBookmarks() {
  return await invoke<{ [feedTitle: string]: ArticleInformation[] }>('get-bookmarks')
}

export function getFeed(feedId: number) {
  return invoke<FeedInformation>('get-feed', feedId)
}

export function editFeed(id: number, title: string, description: string, tag: string | undefined) {
  return invoke<FeedInformation>('edit-feed', id, title, description, tag)
}