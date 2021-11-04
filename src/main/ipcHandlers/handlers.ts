import { ipcMain } from "electron";
import handleAddFeed from "./addFeed";

export default function setupHandlers() {
  ipcMain.handle('add-feed', async (_e, feedUrl, tagName) => handleAddFeed(feedUrl, tagName))
}