/**
 * Uses ipc to send asynchronous messages to the main thread
 */

import { ipcRenderer } from "electron";
import Feed from "../main/database/entities/Feed";
import { SimpleArticle } from "../main/database/mappers/ArticleMapper";
import { SimpleFeed, TagFeeds } from "../main/database/mappers/FeedMapper";
import { RSS } from "../main/rss/data";

async function invoke<T>(action: string, ...args: any[]): Promise<T> {
  const result: T | Error = await ipcRenderer.invoke(action, ...args)
  if (result instanceof Error) throw result
  return result as T
}

export function getFeed(feedUrl: string): Promise<RSS.Feed> {
  return invoke('get-feed', feedUrl)
}

export function getArticlesInFeed(feedId: number) {
  return invoke<SimpleFeed>('get-articles-in-feed', feedId)
}

export async function bookmarkArticle(articleId: number): Promise<TagFeeds> {
  const tagFeeds: TagFeeds = await invoke('bookmark-article', articleId)
  return tagFeeds
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

export async function refreshFeeds(): Promise<TagFeeds> {
  const tagFeeds: TagFeeds = await invoke('refresh-feeds')
  return tagFeeds
}

export async function refreshFeed(feedId: number) {
  await invoke<Feed>('refresh-feed', feedId)
}

export async function getToday() {
  return invoke<{ [feedTitle: string]: SimpleArticle[] }>('get-today')
}

export async function readArticle(articleId: number) {
  const updatedTagFeeds = await invoke<TagFeeds>('read-article', articleId)
  return updatedTagFeeds
}