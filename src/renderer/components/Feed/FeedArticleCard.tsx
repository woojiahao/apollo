import React, { useEffect, useState } from "react";
import { MdCheck, MdOutlineBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { useNavigate } from "react-router";
import { SimpleArticle } from "../../../main/database/mappers/ArticleMapper";
import { bookmarkArticle } from "../../ipcInvoker";

interface ArticleCardProps {
  article: SimpleArticle
  onDataChange: () => void
}

const ArticleCard = ({ article, onDataChange }: ArticleCardProps) => {
  const [isBookmark, setIsBookmark] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setIsBookmark(article.isBookmark)
  }, [article.id, article.isRead])

  function summarizeDescription(description: string) {
    const words = description.split(' ')
    const limited = words.slice(0, 49) /// Limit to just 75 words
    const updated = limited.concat(['...'])
    return updated.join(' ')
  }

  async function bookmark() {
    await bookmarkArticle(article.id, !isBookmark)
    setIsBookmark(!isBookmark)
    onDataChange()
  }

  function toArticle() {
    navigate(`/article/${article.id}`)
  }

  return (
    <div className="mb-4 cursor-pointer">
      <div className="flex items-center justify-between gap-4">
        <h2 onClick={toArticle} className={article.isRead ? 'text-subtitle' : 'text-primary'}>{article.title}</h2>
        <div className="flex gap-4">
          {isBookmark ?
            <MdOutlineBookmark onClick={bookmark} className="hover:fill-subtitle" /> :
            <MdOutlineBookmarkBorder onClick={bookmark} className="hover:fill-subtitle" />
          }
          <MdCheck className="hover:fill-subtitle" />
        </div>
      </div>

      {article.description &&
        <p onClick={toArticle} className={article.isRead ? 'text-faint' : 'text-subtitle'}>{summarizeDescription(article.description)}</p>}
    </div>
  )
}

export default ArticleCard