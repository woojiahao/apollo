/**
 * Uses ipc to send asynchronous messages to the main thread
 */

import { ipcRenderer } from "electron";
import { Feed } from "../main/database/entities/Feed";

export async function getTags(): Promise<string[]> {
  const results: string[] = await ipcRenderer.invoke('get-tags')
  return results
}

export async function addFeed(feedUrl: string, tagName: string | null): Promise<string[]> {
  const results: { savedFeed: Feed, updatedTags: string[] } = await ipcRenderer.invoke('add-feed', feedUrl, tagName)
  return results.updatedTags
}