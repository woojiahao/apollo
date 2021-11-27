import React, { useEffect } from "react";
import '../../../public/prism.css';
import { formatDate } from "../../main/handlers/utility";
import { RSS } from "../../main/rss/data";
import { getArticle } from "../ipcInvoker";

type ArticleViewerProps = {
  articleId: number
  layout: string
}

const ArticleViewer = (props: ArticleViewerProps) => {
  const [article, setArticle] = React.useState<RSS.Item>(undefined)

  const classes = [
    props.layout,
    'container'
  ].join(' ')

  useEffect(() => {
    async function loadArticle() {
      const article = await getArticle(props.articleId)
      setArticle(article)
    }

    loadArticle()
  }, [])

  return (
    <div className={classes}>
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