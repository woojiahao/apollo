import { ipcMain } from "electron"
import DatabseError from "./errors/DatabaseError"
import AddFeedHandler from "./handlers/AddFeedHandler"
import GetArticleHandler from "./handlers/GetArticleHandler"
import GetFeedHandler from "./handlers/GetFeedHandler"
import GetTagFeedsHandler from "./handlers/GetTagFeedsHandler"
import GetTagsHandler from "./handlers/GetTagsHandler"
import GetTodayHandler from "./handlers/GetTodayHandler"
import Handler from "./handlers/Handler"
import ReadArticleHandler from "./handlers/ReadArticleHandler"
import RefreshFeedHandler from "./handlers/RefreshFeedHandler"
import RefreshFeedsHandler from "./handlers/RefreshFeedsHandler"

/**
 * The handler behaves as the data communication layer. It should not be communicating with the database directly, not
 * without direct access to the database
 */

export default function registerHandlers() {
  // TODO: Experiement with sending this to separate thread
  // TODO: Handle concurrent updates to the tag list
  const handlers: { [key: string]: Handler<any> } = {
    'get-feed': new GetFeedHandler(),
    'get-article': new GetArticleHandler(),
    'add-feed': new AddFeedHandler(),
    'get-tags': new GetTagsHandler(),
    'get-tag-feeds': new GetTagFeedsHandler(),
    'get-today': new GetTodayHandler(),
    'refresh-feeds': new RefreshFeedsHandler(),
    'refresh-feed': new RefreshFeedHandler(),
    'read-article': new ReadArticleHandler()
  }

  Object.entries(handlers).forEach(([key, handler]) => {
    ipcMain.handle(key, async (_e, ...args) => {
      try {
        const result = await handler.handle(...args)
        return result
      } catch (e) {
        if (e instanceof DatabseError) console.error(e.print())
        else console.error('Error occurred with handler ', e)
        return e
      }
    })
  })
}
