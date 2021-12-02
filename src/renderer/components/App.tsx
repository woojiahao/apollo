import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import { getTagFeeds, refreshFeeds } from "../ipcInvoker";
import AddFeedForm from "./AddFeedForm";
import ArticleList from "./ArticleList/ArticleList";
import ArticleViewer from "./ArticleViewer";
import Bookmarks from "./Bookmarks";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import Today from "./Today";

const App = () => {
  const [tagFeeds, setTagFeeds] = React.useState<TagFeeds>(undefined);

  async function onDataUpdate() {
    const tf = await getTagFeeds()
    setTagFeeds(tf)
  }

  async function refresh() {
    await refreshFeeds()
  }

  useEffect(() => {
    refresh()
    onDataUpdate()
  }, [])

  return (
    <div className="grid grid-cols-5 gap-10 pr-10 overflow-y-hidden h-screen">
      <NavigationBar tagFeeds={tagFeeds} />

      {/* TODO: Add scroll history */}
      <div className="col-span-4 h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Today />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/add" element={<AddFeedForm layout="col-span-4" onDataUpdate={onDataUpdate.bind(this)} tagFeeds={tagFeeds} />} />
          <Route path="/feed/:id" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleViewer />} />
        </Routes>
      </div>
    </div>
  )
}


export default App