import React, { useEffect, useState } from "react"
import { SimpleArticle } from "../../main/database/mappers/ArticleMapper"
import { getToday } from "../ipcInvoker"
import ArticleCard from "./ArticleList/ArticleCard"

interface TodayProps {
  layout: string
}

const Today = ({ layout }: TodayProps) => {
  const [today, setToday] = useState<SimpleArticle[]>()

  useEffect(() => {
    async function loadData() {
      const today = await getToday()
      setToday(today)
    }

    loadData()
  }, [])

  return (
    <div className={`${layout} container py-6 hidden-scroll`}>
      <h1>Today</h1>
      <p className="text-subtitle mb-6">Latest updates on your RSS feed today</p>

      {today && today.map(a => <ArticleCard article={a} />)}
    </div>
  )
}

export default Today