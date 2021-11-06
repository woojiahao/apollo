import Container from "@mui/material/Container";
import React from "react";
import { RSS } from "../../main/rss/data";
import { getArticle } from "../ipcInvoker";

type FeedState = {
  article: RSS.Item
}

type FeedProps = {
  articleId: number
}

export default class Feed extends React.Component<FeedProps, FeedState> {
  constructor(props: FeedProps) {
    super(props)
    this.state = {
      article: undefined
    }
  }

  async componentDidUpdate(prevProps: FeedProps) {
    if (prevProps.articleId !== this.props.articleId) {
      await this.loadArticle(this.props.articleId)
    }
  }

  // TODO: Add loader
  async loadArticle(articleId: number) {
    const article = await getArticle(articleId)
    this.setState({ article: article })
  }

  render() {
    return (
      <Container maxWidth="lg">
        {this.state.article &&
          (<div>
            <div className="heading">
              <h1>{this.state.article.title}</h1>
              <p>{this.state.article.description}</p>
            </div>
            <div className="item">
              <div dangerouslySetInnerHTML={{ __html: this.state.article.description }} />
              <br />
              {this.state.article.pubDate &&
                <p>Published on: <em>{this.state.article.pubDate.toUTCString()}</em></p>}
              {this.state.article.content &&
                <div dangerouslySetInnerHTML={{ __html: this.state.article.content }} />}
            </div>
          </div>)
        }
      </Container >
    )
  }
}