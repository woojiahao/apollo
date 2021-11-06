/**
 * Uses ipc to send asynchronous messages to the main thread
 */

import { ipcRenderer } from "electron";
import { Feed } from "../main/database/entities/Feed";
import { RSS } from "../main/rss/data";

export async function getFeed(feedUrl: string): Promise<RSS.Feed> {
  const feed: RSS.Feed = await ipcRenderer.invoke('get-feed', feedUrl)
  return feed
}

export async function getTags(): Promise<string[]> {
  const results: string[] = await ipcRenderer.invoke('get-tags')
  return results
}

export async function getTagFeeds(): Promise<RSS.TagFeeds> {
  const tagFeeds: RSS.TagFeeds = await ipcRenderer.invoke('get-tag-feeds')
  return tagFeeds
}

export async function addFeed(
  rawFeed: RSS.Feed,
  feedUrl: string,
  tagName: string | null): Promise<Feed> {
  // TODO: Experiment if two separate ipc calls create lag?
  const newFeed: Feed = await ipcRenderer.invoke('add-feed', rawFeed, feedUrl, tagName)
  return newFeed
}