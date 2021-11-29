import React, { useEffect, useState } from "react";
import { MdBookmarkBorder, MdCheck, MdOutlineBookmark } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { SimpleArticle } from "../../../main/database/mappers/ArticleMapper";
import { bookmarkArticle } from "../../ipcInvoker";

interface ArticleCardProps {
  article: SimpleArticle
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isBookmark, setIsBookmark] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setIsBookmark(article.isBookmark)
  }, [id])

  function summarizeDescription(description: string) {
    const words = description.split(' ')
    const limited = words.slice(0, 49) /// Limit to just 75 words
    const updated = limited.concat(['...'])
    return updated.join(' ')
  }

  async function bookmark() {
    setIsBookmark(!isBookmark)
    await bookmarkArticle(article.id, isBookmark)
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
            <MdOutlineBookmark onClick={bookmark} className="hover:fill-current hover:text-subtitle" /> :
            <MdBookmarkBorder onClick={bookmark} className="hover:fill-current hover:text-subtitle" />
          }
          <MdCheck className="hover:fill-current hover:text-subtitle" />
        </div>
      </div>

      {article.description &&
        <p onClick={toArticle} className={article.isRead ? 'text-faint' : 'text-subtitle'}>{summarizeDescription(article.description)}</p>}
    </div>
  )
}

export default ArticleCard