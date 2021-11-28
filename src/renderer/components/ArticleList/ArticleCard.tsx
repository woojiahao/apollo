import React from "react";
import { MdCheck, MdOutlineBookmark } from "react-icons/md";
import { useNavigate } from "react-router";
import { SimpleArticle } from "../../../main/database/mappers/ArticleMapper";

interface ArticleCardProps {
  article: SimpleArticle
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const navigate = useNavigate()

  function summarizeDescription(description: string) {
    const words = description.split(' ')
    const limited = words.slice(0, 49) /// Limit to just 75 words
    const updated = limited.concat(['...'])
    return updated.join(' ')
  }

  return (
    <div className="mb-4 cursor-pointer" onClick={() => navigate(`/article/${article.id}`)}>
      <div className="flex items-center justify-between">
        <h2 className={article.isRead ? 'text-subtitle' : 'text-primary'}>{article.title}</h2>
        <div className="flex">
          <MdOutlineBookmark className="mx-4 hover:fill-current hover:text-subtitle" />
          <MdCheck className="hover:fill-current hover:text-subtitle" />
        </div>
      </div>

      {article.description &&
        <p className={article.isRead ? 'text-faint' : 'text-subtitle'}>{summarizeDescription(article.description)}</p>}
    </div>
  )
}

export default ArticleCard