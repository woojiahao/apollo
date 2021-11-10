/**
 * Uses ipc to send asynchronous messages to the main thread
 */

import { ipcRenderer } from "electron";
import Feed from "../main/database/entities/Feed";
import { RSS } from "../main/rss/data";

async function invoke(action: string, ...args: any[]) {
  return await ipcRenderer.invoke(action, ...args)
}

export async function getFeed(feedUrl: string): Promise<RSS.Feed> {
  const feed: RSS.Feed = await invoke('get-feed', feedUrl)
  return feed
}

export async function getArticle(articleId: number): Promise<RSS.Item> {
  const article: RSS.Item = await invoke('get-article', articleId)
  return article
}

export async function getTags(): Promise<string[]> {
  const results: string[] = await invoke('get-tags')
  return results
}

export async function getTagFeeds(): Promise<RSS.TagFeeds> {
  const tagFeeds: RSS.TagFeeds = await invoke('get-tag-feeds')
  return tagFeeds
}

export async function addFeed(rawFeed: RSS.Feed, feedUrl: string, tagName: string | null): Promise<Feed> {
  // TODO: Experiment if two separate ipc calls create lag?
  const newFeed: Feed = await invoke('add-feed', rawFeed, feedUrl, tagName)
  return newFeed
}

export async function refreshFeeds(): Promise<RSS.TagFeeds> {
  const tagFeeds: RSS.TagFeeds = await invoke('refresh-feeds')
  return tagFeeds
}

export async function refreshFeed(feedId: number): Promise<RSS.TagFeeds> {
  const tagFeeds: RSS.TagFeeds = await invoke('refresh-feed', feedId)
  return tagFeeds
}