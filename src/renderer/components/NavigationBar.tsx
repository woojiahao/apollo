import React from "react";
import { MdBookmarks, MdOutlineAdd, MdRefresh, MdToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import FeedList from "./FeedList";
import WrapIcon from "./WrapIcon";

interface NavigationBarProps {
  tagFeeds: TagFeeds
}

const NavigationBar = ({ tagFeeds }: NavigationBarProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 container bg-background h-screen border-box py-6 hidden-scroll">
      <div>
        <WrapIcon icon={<MdToday />} content="Today" onClick={() => navigate('/today')} />
        <WrapIcon icon={<MdBookmarks />} content="Bookmarks" onClick={() => navigate('/bookmarks')} />
      </div>

      <div className="flex justify-between items-center">
        <span className="font-bold text-subtitle">Feeds</span>
        <div className="flex space-x-6">
          <MdRefresh />
          <MdOutlineAdd className="hover:fill-subtitle cursor-pointer" onClick={() => navigate('/add')} />
        </div>
      </div>

      {tagFeeds && <FeedList tagFeeds={tagFeeds} />}
    </div>

  )
}

export default NavigationBar