import React from "react"
import { ArticleInformation } from "../../../main/database/mappers/ArticleMapper"
import ArticleCard from "./FeedArticleCard"

interface FeedArticlesProps {
  title: string
  description?: string
  articles: { [group: string]: ArticleInformation[] }
  onDataChange: () => void
}

const FeedArticles = ({ title, description, articles, onDataChange }: FeedArticlesProps) => {
  return (
    <div className="flex flex-col gap-6 col-span-3 h-full container hidden-scroll">
      <div>
        <h1>{title}</h1>
        {description && <p className="text-subtitle">{description}</p>}
      </div>

      {Object.entries(articles).map(([group, articles]) => {
        return (
          <div>
            <p className="text-subtitle text-tiny">{group}</p>
            {articles.map(a => <ArticleCard onDataChange={onDataChange} article={a} />)}
          </div>
        )
      })}
    </div>
  )
}

export default FeedArticles