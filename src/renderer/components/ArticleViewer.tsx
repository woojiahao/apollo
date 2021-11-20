import { createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import '../../../public/prism.css';
import { RSS } from "../../main/rss/data";
import { getArticle } from "../ipcInvoker";

type ArticleViewerProps = {
  articleId: number
}

type ArticleViewerState = {
  article: RSS.Item
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Serif',
      'serif'
    ].join(',')
  }
})

export default class ArticleViewer extends React.Component<ArticleViewerProps, ArticleViewerState> {
  constructor(props: ArticleViewerProps) {
    super(props)
    this.state = {
      article: undefined
    }
  }

  async componentDidUpdate(prevProps: ArticleViewerProps) {
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
              <Typography variant="h1">
                {this.state.article.title}
              </Typography>
              <div className="item">
                <br />
                {/* TODO: When redirected to a different page, show a top bar to navigate back */}
                {/* TODO: Load iFrame */}
                {this.state.article.pubDate &&
                  <Typography variant="body1">Published on: <em>{this.state.article.pubDate.toUTCString()}</em></Typography>}
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