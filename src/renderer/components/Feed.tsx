import Container from "@mui/material/Container";
import React from "react";
import { RSS } from "../../main/rss/data";
import { loadFeed } from "../../main/rss/rss";

type FeedState = {
  title: string,
  description: string,
  feed: Array<RSS.Item>
}

type FeedProps = {
  feedURL: string
}

export default class Feed extends React.Component<FeedProps, FeedState> {
  constructor(props: FeedProps) {
    super(props)
    this.state = {
      title: '',
      description: '',
      feed: []
    }
  }

  async componentDidUpdate(prevProps: FeedProps) {
    if (prevProps.feedURL !== this.props.feedURL) {
      await this.loadFeed(this.props.feedURL)
    }
  }

  async loadFeed(url: string) {
    const feed = await loadFeed(url)
    this.setState({
      title: feed.title,
      description: feed.description,
      feed: feed.items.slice()
    })
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div className="heading">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
        </div>
        {
          this.state.feed.map(item => (
            <div className="item">
              <h3>{item.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              <br />
              {item.pubDate &&
                <p>Published on: <em>{item.pubDate.toUTCString()}</em></p>}
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          ))
        }
      </Container >
    )
  }
}