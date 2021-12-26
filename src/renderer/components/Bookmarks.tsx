
import React, { useEffect, useState } from "react"
import { ArticleInformation } from "../../main/database/mappers/ArticleMapper"
import { getBookmarks } from "../ipcInvoker"
import Feed from "./Feed/Feed"
import FeedArticles from "./Feed/FeedArticles"

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<{ [feedTitle: string]: ArticleInformation[] }>()

  async function loadData() {
    const bookmarks = await getBookmarks()
    setBookmarks(bookmarks)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Feed data={bookmarks}>
      <FeedArticles
        title="Bookmarks"
        description="Your favorite articles"
        articles={bookmarks}
        onDataChange={loadData.bind(this)} />
    </Feed>
  )
}

export default Bookmarks