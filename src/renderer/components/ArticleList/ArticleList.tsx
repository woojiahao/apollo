import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SimpleFeed } from "../../../main/database/mappers/FeedMapper";
import { getArticlesInFeed } from "../../ipcInvoker";
import Feed from "../Feed/Feed";
import FeedArticles from "../Feed/FeedArticles";
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

  if (feed !== undefined) {
    return (
      <Feed data={feed}>
        <FeedArticles
          title={feed.title}
          description={feed.description}
          articles={feed.articles}
          onDataChange={loadArticles.bind(this)} />

        <ArticleListSidebar
          feedId={feedId}
          articles={Object.values(feed.articles).reduce((prev, cur) => prev.concat(cur), [])}
          onDataChange={loadArticles.bind(this)} />
      </Feed>
    )
  }

  return <div></div>
}

export default ArticleList