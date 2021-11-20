import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";
import { SimpleArticle } from "../../main/database/mappers/ArticleMapper";
import { getArticlesInFeed } from "../ipcInvoker";
import { getMonth } from "../utility";

type ArticleListProps = {
  /// Feed to load
  feedId: number
  onArticleIdChange: (articleId: number) => void
}

type ArticleListState = {
  articles: SimpleArticle[]
}

export default class ArticleList extends React.Component<ArticleListProps, ArticleListState> {
  constructor(props: ArticleListProps) {
    super(props)
    this.state = {
      articles: []
    }
  }

  async componentDidUpdate(prevProps: ArticleListProps) {
    if (prevProps.feedId !== this.props.feedId) {
      const articles = await getArticlesInFeed(this.props.feedId)
      this.setState({ articles })
    }
  }

  formatDate(date: Date) {
    const day = date.getUTCDay()
    const month = getMonth(date.getUTCMonth())
    const year = date.getUTCFullYear()
    return `${day} ${month} ${year}`
  }

  render() {
    return (
      <Box>
        {/* TODO: Add isRead and isBookmark */}
        {this.state.articles.map(({ id, title, description, publishedDate }) => {
          return (
            <Box onClick={() => this.props.onArticleIdChange(id)}>
              <Typography variant="h3">{title}</Typography>

              {description && <Typography variant="subtitle1">{description}</Typography>}
              {publishedDate && <Typography variant="subtitle2">{this.formatDate(publishedDate)}</Typography>}
            </Box>
          )
        })}
      </Box>
    )
  }
}