import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SimpleFeed } from "../../../main/database/mappers/FeedMapper";
import { getArticlesInFeed } from "../../ipcInvoker";
import ArticleCard from "./ArticleCard";
import ArticleListSidebar from "./ArticleListSidebar";

const ArticleList = () => {
  const [feed, setFeed] = useState<SimpleFeed>(undefined)

  const { id } = useParams()
  const feedId = parseInt(id)

  async function loadArticles() {
    const f = await getArticlesInFeed(feedId)
    setFeed(f)
  }

  useEffect(() => {
    loadArticles()
  }, [feedId])

  return (
    <div className="grid grid-cols-4 h-full py-6">
      {feed &&
        <div className="col-span-3 h-full container hidden-scroll">
          <h1>{feed.title}</h1>
          {feed.description &&
            <p className="text-subtitle mb-6">{feed.description}</p>}

          {Object.entries(feed.articles).map(([publishedDate, articles]) => {
            return (
              <div className="mb-6">
                <p className="text-subtitle text-tiny">{publishedDate}</p>
                {articles.map(article => <ArticleCard onDataChange={loadArticles} article={article} />)}
              </div>
            )
          })}
        </div>
      }

      {feed &&
        <ArticleListSidebar articles={Object.values(feed.articles).reduce((prev, cur) => prev.concat(cur), [])} />
      }
    </div>

  )
}

export default ArticleList