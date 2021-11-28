import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import { getTagFeeds } from "../ipcInvoker";
import AddFeedForm from "./AddFeedForm";
import ArticleList from "./ArticleList/ArticleList";
import ArticleViewer from "./ArticleViewer";
import Home from "./Home";
import NavigationBar from "./NavigationBar";

const App = () => {
  const [tagFeeds, setTagFeeds] = React.useState<TagFeeds>(undefined);

  (async () => {
    const tf = await getTagFeeds()
    setTagFeeds(tf)
  })()

  async function onDataUpdate() {
    const tf = await getTagFeeds()
    setTagFeeds(tf)
  }

  return (
    <div className="grid grid-cols-5 gap-10 overflow-y-hidden h-screen">
      <NavigationBar tagFeeds={tagFeeds} />

      {/* TODO: Add scroll history */}
      <Routes>
        <Route path="/" element={<Home layout="col-span-4 pr-10" />} />
        <Route path="/add" element={<AddFeedForm layout="col-span-4 pr-16" onDataUpdate={onDataUpdate.bind(this)} />} />
        <Route path="/feed/:id" element={<ArticleList layout="col-span-3" />} />
        <Route path="/article/:id" element={<ArticleViewer layout="col-span-3" />} />
      </Routes>
    </div>
  )
}


export default App