import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SimpleFeed } from "../../../main/database/mappers/FeedMapper";
import { getArticlesInFeed } from "../../ipcInvoker";
import ArticleCard from "./ArticleCard";

interface ArticleListProps {
  layout: string
}

const ArticleList = ({ layout }: ArticleListProps) => {
  const [feed, setFeed] = useState<SimpleFeed>(undefined)

  const classes = [
    layout,
    'container',
    'hidden-scroll',
    'py-6'
  ].join(' ')

  const { id } = useParams()
  const feedId = parseInt(id)

  useEffect(() => {
    async function loadArticles() {
      const f = await getArticlesInFeed(feedId)
      setFeed(f)
    }

    loadArticles()
  }, [feedId])

  return (
    <div className={classes}>
      {feed &&
        <div>
          <h1>{feed.title}</h1>
          {feed.description &&
            <p className="text-subtitle mb-6">{feed.description}</p>}

          {Object.entries(feed.articles).map(([publishedDate, articles]) => {
            return (
              <div className="mb-6">
                <p className="text-subtitle text-tiny">{publishedDate}</p>
                {articles.map(article => <ArticleCard article={article} />)}
              </div>
            )
          })}
        </div>
      }
    </div>

  )
}

export default ArticleList