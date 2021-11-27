import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import { getTagFeeds } from "../ipcInvoker";
import ArticleList from "./ArticleList/ArticleList";
import ArticleViewer from "./ArticleViewer";
import Home from "./Home";
import NavigationBar from "./NavigationBar";

const App = () => {
  const [tagFeeds, setTagFeeds] = React.useState<TagFeeds>(undefined)

  useEffect(() => {
    async function loadTagFeeds() {
      const tagFeeds = await getTagFeeds()
      setTagFeeds(tagFeeds)
    }

    loadTagFeeds()
  }, [])

  return (
    <div className="grid grid-cols-5 gap-12 overflow-y-hidden h-screen">
      <NavigationBar tagFeeds={tagFeeds} />

      {/* TODO: Add scroll history */}
      <Routes>
        <Route path="/" element={<Home layout="col-span-4" />} />
        <Route path="/feed/:id" element={<ArticleList layout="col-span-3" />} />
        <Route path="/article/:id" element={<ArticleViewer layout="col-span-3" />} />
      </Routes>
    </div>
  )
}


export default App