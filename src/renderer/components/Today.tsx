import React, { useEffect, useState } from "react"
import { ArticleInformation } from "../../main/database/mappers/ArticleMapper"
import { getToday } from "../ipcInvoker"
import Feed from "./Feed/Feed"
import FeedArticles from "./Feed/FeedArticles"

const Today = () => {
  const [today, setToday] = useState<{ [feedTitle: string]: ArticleInformation[] }>()

  async function loadData() {
    const today = await getToday()
    setToday(today)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Feed data={today}>
      <FeedArticles
        title="Today"
        description="Latest updates on your RSS feed!"
        articles={today}
        onDataChange={loadData.bind(this)} />
    </Feed>
  )
}

export default Today