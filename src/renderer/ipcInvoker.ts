/**
 * Uses ipc to send asynchronous messages to the main thread
 */

import { ipcRenderer } from "electron";
import { Feed } from "../main/database/entities/Feed";
import { RSS } from "../main/rss/data";

export async function getTags(): Promise<string[]> {
  const results: string[] = await ipcRenderer.invoke('get-tags')
  return results
}

export async function getTagFeeds(): Promise<RSS.TagFeeds> {
  const tagFeeds: RSS.TagFeeds = await ipcRenderer.invoke('get-tag-feeds')
  return tagFeeds
}

export async function addFeed(feedUrl: string, tagName: string | null): Promise<RSS.TagFeeds> {
  // TODO: Experiment if two separate ipc calls create lag?
  const newFeed: Feed = await ipcRenderer.invoke('add-feed', feedUrl, tagName)
  const updatedTagFeeds: RSS.TagFeeds = await getTagFeeds()
  return updatedTagFeeds
}