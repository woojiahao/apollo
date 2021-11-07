import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import '../../../public/prism.css';
import { RSS } from "../../main/rss/data";
import { getArticle } from "../ipcInvoker";

type FeedState = {
  article: RSS.Item
}

type FeedProps = {
  articleId: number
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans',
      'Noto Serif',
      'Roboto',
      'Open Sans',
      'serif'
    ].join(',')
  }
})

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          {this.state.article &&
            (<div>
              <div className="heading">
                <h1>{this.state.article.title}</h1>
              </div>
              <div className="item">
                <br />
                {/* TODO: When redirected to a different page, show a top bar to navigate back */}
                {/* TODO: Load iFrame */}
                {this.state.article.pubDate &&
                  <p>Published on: <em>{this.state.article.pubDate.toUTCString()}</em></p>}
                {this.state.article.content ?
                  <div dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div> :
                  this.state.article.description ?
                    <div dangerouslySetInnerHTML={{ __html: this.state.article.description }}></div> :
                    <div> Read more <a href={this.state.article.link}>here</a> </div>}
              </div>
            </div>)
          }
        </Container >
      </ThemeProvider>
    )
  }
}