import React, { useEffect, useState } from "react"
import { SimpleArticle } from "../../main/database/mappers/ArticleMapper"
import { getToday } from "../ipcInvoker"
import ArticleCard from "./ArticleList/ArticleCard"

const Today = () => {
  const [today, setToday] = useState<{ [feedTitle: string]: SimpleArticle[] }>()

  async function loadData() {
    const today = await getToday()
    setToday(today)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="grid grid-cols-4 gap-4 h-full py-6">
      <div className="container hidden-scroll col-span-3">
        <h1>Today</h1>
        <p className="text-subtitle mb-6">Latest updates on your RSS feed today</p>

        {today && (Object.entries(today).map(([feedTitle, articles]) => {
          return (
            <div className="mb-6">
              <p className="text-subtitle text-tiny">{feedTitle}</p>
              {articles.map(a => <ArticleCard onDataChange={loadData} article={a} />)}
            </div>
          )
        }))}
      </div>
    </div>
  )
}

export default Today