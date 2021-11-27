import React from "react";
import { SimpleFeed } from "../../../main/database/mappers/FeedMapper";
import { getArticlesInFeed } from "../../ipcInvoker";
import ArticleCard from "./ArticleCard";

interface ArticleListProps {
  layout: string
  feedId: number
  onSelectArticle: (id: number) => void
}

interface ArticleListState {
  feed: SimpleFeed
}

export default class ArticleList extends React.Component<ArticleListProps, ArticleListState> {
  constructor(props: ArticleListProps) {
    super(props)
    this.state = {
      feed: undefined
    }
  }

  async componentDidMount() {
    const feed = await getArticlesInFeed(this.props.feedId)
    this.setState({
      feed: feed
    })
  }

  async componentDidUpdate(newProps: ArticleListProps) {
    if (newProps.feedId !== this.props.feedId) {
      const feed = await getArticlesInFeed(newProps.feedId)
      this.setState({
        feed: feed
      })
    }
  }

  render() {
    const classes = [
      this.props.layout,
      'container',
      'hidden-scroll',
      'py-6'
    ].join(' ')
    return (
      <div className={classes}>
        {this.state.feed &&
          <div>
            <h1>{this.state.feed.title}</h1>
            {this.state.feed.description &&
              <p className="text-subtitle mb-6">{this.state.feed.description}</p>}

            {Object.entries(this.state.feed.articles).map(([publishedDate, articles]) => {
              return (
                <div className="mb-6">
                  <p className="text-subtitle text-tiny">{publishedDate}</p>
                  {articles.map(article => <ArticleCard article={article} />)}
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }
}