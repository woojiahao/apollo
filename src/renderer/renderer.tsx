import { Box, CircularProgress, createTheme, CssBaseline, Grid, Modal, ThemeProvider } from '@mui/material'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SimpleArticle } from '../main/database/mappers/ArticleMapper'
import { RSS } from '../main/rss/data'
import AddFeedDialog from './components/AddFeedDialog'
import Feed from './components/Feed'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import { getTagFeeds, getToday, refreshFeed as ipcRefreshFeed, refreshFeeds as ipcRefreshFeeds } from './ipcInvoker'
import './styles.css'

type IndexState = {
  articleId: number,
  tagFeeds: RSS.TagFeeds,
  today: SimpleArticle[],
  isAddFeedDialogOpen: boolean,
  isLoading: boolean
}

const globalTheme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
    fontSize: 16
  }
})

export default class Index extends React.Component<{}, IndexState> {
  constructor(props) {
    super(props)
    this.state = {
      articleId: undefined,
      tagFeeds: {},
      today: [],
      isAddFeedDialogOpen: false,
      isLoading: false
    }
  }

  async refreshTagFeeds() {
    const tagFeeds = await getTagFeeds()
    this.setState({
      tagFeeds: tagFeeds,
    })
  }

  async componentDidMount() {
    await this.refreshFeeds()
  }

  setArticleId(articleId: number) {
    this.setState({ articleId: articleId })
  }

  openAddFeedDialog() {
    this.setState({ isAddFeedDialogOpen: true })
  }

  async closeAddFeedDialog() {
    await this.refreshTagFeeds()
    this.setState({ isAddFeedDialogOpen: false })
  }

  async refreshFeeds() {
    this.setState({ isLoading: true })
    ipcRefreshFeeds().then(async (updatedTagFeeds) => {
      const today = await getToday()
      this.setState({
        isLoading: false,
        tagFeeds: updatedTagFeeds,
        today: today
      })
    })
  }

  async refreshFeed(feedId: number) {
    const updatedTagFeeds = await ipcRefreshFeed(feedId)
    this.setState({ tagFeeds: updatedTagFeeds })
  }

  render() {
    return (
      <ThemeProvider theme={globalTheme}>
        <CssBaseline />
        <Box sx={{ height: `100%`, overflow: `hidden` }}>
          <Grid
            container
            sx={{ height: `100%` }}>
            <Grid item xs="auto" alignItems="flex-end">
              <Navigation
                onOpenAddFeedDialog={() => this.openAddFeedDialog()}
                onRefreshFeeds={() => this.refreshFeeds()} />
            </Grid>

            <AddFeedDialog
              open={this.state.isAddFeedDialogOpen}
              tagFeeds={this.state.tagFeeds}
              onClose={() => this.closeAddFeedDialog()} />

            <Modal open={this.state.isLoading} onBackdropClick={() => null}>
              <Box sx={{ display: 'flex', justifyContent: 'center', height: `100%`, alignItems: 'center' }}>
                <CircularProgress />
              </Box>
            </Modal>

            <Grid
              item
              xs={3}
              sx={{
                height: `100vh`,
                padding: `16px`,
                boxSizing: `border-box`,
                backgroundColor: `#FBFBFB`,
                overflowY: 'auto'
              }}>
              <Sidebar
                loadArticle={this.setArticleId.bind(this)}
                tagFeeds={this.state.tagFeeds}
                today={this.state.today}
                refreshFeed={feedId => this.refreshFeed(feedId)} />
            </Grid>

            <Grid
              item
              xs
              sx={{
                height: `100%`,
                overflowY: `auto`
              }}>
              <Feed articleId={this.state.articleId} />
            </Grid>
          </Grid>
        </Box >
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))