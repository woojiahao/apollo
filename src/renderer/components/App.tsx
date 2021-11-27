import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import { getTagFeeds } from "../ipcInvoker";
import ArticleList from "./ArticleList/ArticleList";
import ArticleViewer from "./ArticleViewer";
import NavigationBar from "./NavigationBar";

const App = () => {
  const [articleId, setArticleId] = React.useState<number>(undefined)
  const [feedId, setFeedId] = React.useState<number>(undefined)
  const [tagFeeds, setTagFeeds] = React.useState<TagFeeds>(undefined)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadTagFeeds() {
      const tagFeeds = await getTagFeeds()
      setTagFeeds(tagFeeds)
    }

    loadTagFeeds()
  }, [])

  function selectArticle(articleId: number) {
    setArticleId(articleId)
    navigate('/article')
  }

  return (
    <div className="grid grid-cols-5 gap-12 overflow-y-hidden h-screen">
      <NavigationBar tagFeeds={tagFeeds} />

      {/* TODO: Add scroll history */}
      <Routes>
        <Route path="/" element={<ArticleList layout="col-span-3" feedId={1} onSelectArticle={selectArticle.bind(this)} />} />
        <Route path="/article/:id" element={<ArticleViewer layout="col-span-3" />} />
      </Routes>
    </div>
  )
}


export default App