/**
 * Uses ipc to send asynchronous messages to the main thread
 */

import { ipcRenderer } from "electron";
import { Feed } from "../main/database/entities/Feed";

export function addFeed(feedUrl: string, tagName: string | null) {
  ipcRenderer
    .invoke('add-feed', feedUrl, tagName)
    .then((result: Feed) => {
      console.log(result.feedId)
    })
}