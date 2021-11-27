import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArticleList from "./ArticleList/ArticleList";
import ArticleViewer from "./ArticleViewer";
import NavigationBar from "./NavigationBar";

const App = () => {
  const [articleId, setArticleId] = React.useState(undefined)

  const navigate = useNavigate()

  const tagFeeds = {
    'Programming': [
      { feedId: 1, feedTitle: 'A Programmer\'s Perspective' },
      { feedId: 2, feedTitle: 'SlashDot' },
      { feedId: 3, feedTitle: 'Bob\'s Feed' },
    ],
    'Uncategorized': [
      { feedId: 4, feedTitle: 'John Green' }
    ]
  }

  function selectArticle(articleId: number) {
    setArticleId(articleId)
    navigate('/article')
  }

  return (
    <div className="grid grid-cols-5 gap-12">
      <NavigationBar tagFeeds={tagFeeds} />

      <Routes>
        <Route path="/" element={<ArticleList layout="col-span-3" feedId={1} onSelectArticle={selectArticle.bind(this)} />} />
        <Route path="article" element={<ArticleViewer layout="col-span-3" articleId={articleId} />} />
      </Routes>
    </div>
  )
}


export default App