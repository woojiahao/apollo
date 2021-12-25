import { ipcMain } from "electron"
import DatabseError from "./errors/DatabaseError"
import AddFeedHandler from "./handlers/AddFeedHandler"
import BookmarkArticleHandler from "./handlers/BookmarkArticleHandler"
import GetArticleHandler from "./handlers/GetArticleHandler"
import GetArticlesInFeedHandler from "./handlers/GetArticlesInFeedHandler"
import GetBookmarksHandler from "./handlers/GetBookmarksHandler"
import GetFeedHandler from "./handlers/GetFeedHandler"
import GetTagFeedsHandler from "./handlers/GetTagFeedsHandler"
import GetTagsHandler from "./handlers/GetTagsHandler"
import GetTodayHandler from "./handlers/GetTodayHandler"
import Handler from "./Handler"
import LoadFeedHandler from "./handlers/LoadFeedHandler"
import ReadAllArticlesInFeedHandler from "./handlers/ReadAllArticlesInFeedHandler"
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

  [
    LoadFeedHandler,
    GetArticleHandler,
    GetArticlesInFeedHandler,
    AddFeedHandler,
    GetTagsHandler,
    GetTagFeedsHandler,
    GetTodayHandler,
    RefreshFeedsHandler,
    RefreshFeedHandler,
    ReadArticleHandler,
    ReadAllArticlesInFeedHandler,
    BookmarkArticleHandler,
    GetBookmarksHandler,
    GetFeedHandler
  ]
    .map(handler => new handler())
    .forEach((handler: Handler<any>) => {
      ipcMain.handle(handler.key, async (_e, ...args) => {
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
