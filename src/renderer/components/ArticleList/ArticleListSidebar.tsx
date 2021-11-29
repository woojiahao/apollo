import React from "react";
import { MdBookmarks, MdGolfCourse } from "react-icons/md";
import { Link } from "react-router-dom";
import { SimpleArticle } from "../../../main/database/mappers/ArticleMapper";
import WrapIcon from "../WrapIcon";

interface ArticleListSidebarProps {
  articles: SimpleArticle[]
}

const ArticleListSidebar = ({ articles }: ArticleListSidebarProps) => {
  return (
    <div className="flex flex-col justify-center">
      <div className={`flex flex-col gap-2 ${articles.filter(a => !a.isRead).length === 0 ? 'hidden' : 'block'}`}>
        <WrapIcon icon={<MdGolfCourse />} content="Unread" />
        <ul>
          {articles.filter(a => !a.isRead).map(a => <li className="hover:bg-background p-2"><Link to={`/article/${a.id}`}>{a.title}</Link></li>)}
        </ul>
      </div>
      <div className={`flex flex-col gap-2 ${articles.filter(a => a.isBookmark).length === 0 ? 'hidden' : 'block'}`}>
        <WrapIcon icon={<MdBookmarks />} content="Bookmarks" />
        <ul>
          {articles.filter(a => a.isBookmark).map(a => <li className="hover:bg-background p-2"><Link to={`/article/${a.id}`}>{a.title}</Link></li>)}
        </ul>
      </div>
    </div>
  )
}

export default ArticleListSidebar