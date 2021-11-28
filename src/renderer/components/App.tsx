import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import { getTagFeeds } from "../ipcInvoker";
import AddFeedForm from "./AddFeedForm";
import ArticleList from "./ArticleList/ArticleList";
import ArticleViewer from "./ArticleViewer";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import Today from "./Today";

const App = () => {
  const [tagFeeds, setTagFeeds] = React.useState<TagFeeds>(undefined);

  async function onDataUpdate() {
    const tf = await getTagFeeds()
    setTagFeeds(tf)
  }

  useEffect(() => {
    onDataUpdate()
  }, [])

  return (
    <div className="grid grid-cols-5 gap-10 pr-10 overflow-y-hidden h-screen">
      <NavigationBar tagFeeds={tagFeeds} />

      {/* TODO: Add scroll history */}
      <Routes>
        <Route path="/" element={<Home layout="col-span-4" />} />
        <Route path="/today" element={<Today layout="col-span-3" />} />
        <Route path="/add" element={<AddFeedForm layout="col-span-4" onDataUpdate={onDataUpdate.bind(this)} tagFeeds={tagFeeds} />} />
        <Route path="/feed/:id" element={<ArticleList layout="col-span-3" />} />
        <Route path="/article/:id" element={<ArticleViewer layout="col-span-3" />} />
      </Routes>
    </div>
  )
}


export default App