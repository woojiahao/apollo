import React from "react";
import { MdBookmarks, MdCheck, MdEdit, MdGolfCourse, MdRefresh } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ArticleInformation } from "../../../main/database/mappers/ArticleMapper";
import { readAllArticlesInFeed, refreshFeed } from "../../ipcInvoker";
import Sidebar from "../Sidebar/Sidebar";
import SidebarActions from "../Sidebar/SidebarActions";
import SidebarGroup from "../Sidebar/SidebarGroup";
import SidebarGroups from "../Sidebar/SidebarGroups";
import WrapIcon from "../WrapIcon";

interface ArticleListSidebarProps {
  feedId: number
  articles: ArticleInformation[]
  onDataChange: () => void
}

const ArticleListSidebar = ({ feedId, articles, onDataChange }: ArticleListSidebarProps) => {
  const navigate = useNavigate()

  async function readAll() {
    await readAllArticlesInFeed(feedId)
    onDataChange()
  }

  async function refresh() {
    await refreshFeed(feedId)
    onDataChange()
  }

  return (
    <Sidebar>
      <SidebarActions>
        <WrapIcon icon={<MdCheck />} content="Mark All As Read" onClick={readAll} />
        <WrapIcon icon={<MdRefresh />} content="Refresh Feed" onClick={refresh} />
        <WrapIcon icon={<MdEdit />} content="Edit Feed" onClick={() => navigate(`/edit/${feedId}`)} />
      </SidebarActions>

      <SidebarGroups>
        <SidebarGroup
          icon={<MdGolfCourse />}
          title="Unread"
          data={articles.filter(a => !a.isRead)}
          render={(a: ArticleInformation) => <li className="hover:bg-background p-2"><Link to={`/article/${a.id}`}>{a.title}</Link></li>} />

        <SidebarGroup
          icon={<MdBookmarks />}
          title="Bookmarks"
          data={articles.filter(a => a.isBookmark)}
          render={(a: ArticleInformation) => <li className="hover:bg-background p-2"><Link to={`/article/${a.id}`}>{a.title}</Link></li>} />
      </SidebarGroups>
    </Sidebar>
  )
}

export default ArticleListSidebar