import React, { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router";
import '../../../public/prism.css';
import { RSS } from "../../main/rss/data";
import { formatDate } from "../../main/utility";
import { getArticle } from "../ipcInvoker";
import WrapIcon from "./WrapIcon";

type ArticleViewerProps = {
  layout: string
}

const ArticleViewer = ({ layout }: ArticleViewerProps) => {
  const [article, setArticle] = React.useState<RSS.Item>(undefined)

  const navigate = useNavigate()

  const { id } = useParams()

  const articleId = parseInt(id)

  const classes = [
    layout,
    'container',
    'hidden-scroll',
    'py-6'
  ].join(' ')

  useEffect(() => {
    async function loadArticle() {
      const article = await getArticle(articleId)
      setArticle(article)
    }

    loadArticle()
  }, [])

  function back() {
    navigate(-1)
  }

  return (
    <div className={classes}>
      <WrapIcon icon={<MdArrowBack />} content="Back" onClick={back.bind(this)} />
      {article &&
        (
          <div>
            {/* TODO: When redirected to a different page, show a top bar to navigate back */}
            {/* TODO: Load iFrame */}
            <h1>{article.title}</h1>
            {article.pubDate && <p className="text-subtitle text-tiny">Published on: {formatDate(article.pubDate)}</p>}
            {article.content ?
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div> :
              article.description ?
                <div dangerouslySetInnerHTML={{ __html: article.description }}></div> :
                <p>Read more <a href={article.link} target="_blank">here</a></p>
            }
          </div>
        )
      }
    </div >
  )
}

export default ArticleViewer