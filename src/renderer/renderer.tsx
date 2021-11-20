import { Box, CircularProgress, createTheme, CssBaseline, Grid, Modal, ThemeProvider } from '@mui/material'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SimpleArticle } from '../main/database/mappers/ArticleMapper'
import { TagFeeds } from '../main/database/mappers/FeedMapper'
import AddFeedDialog from './components/AddFeedDialog'
import Feed from './components/Feed'
import FeedList from './components/FeedList'
import Navigation from './components/Navigation'
import { bookmarkArticle as ipcBookmarkArticle, getTagFeeds, getToday, readArticle as ipcReadArticle, refreshFeed as ipcRefreshFeed, refreshFeeds as ipcRefreshFeeds } from './ipcInvoker'
import './styles.css'

type IndexState = {
  feedId: number,
  articleId: number,
  tagFeeds: TagFeeds,
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
      feedId: undefined,
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

  onFeedIdChange(feedId: number) {
    this.setState({ feedId: feedId })
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
    const [updatedTagFeeds, updatedToday] = await Promise.all([ipcRefreshFeeds(), getToday()])
    this.setState({
      isLoading: false,
      tagFeeds: updatedTagFeeds,
      today: updatedToday
    })
  }

  async refreshFeed(feedId: number) {
    const updatedTagFeeds = await ipcRefreshFeed(feedId)
    this.setState({ tagFeeds: updatedTagFeeds })
  }

  async readArticle(articleId: number) {
    /// TODO: Figure out if there's a less expensive way to read an article and update the state
    const updatedTagFeeds = await ipcReadArticle(articleId)
    const today = await getToday()
    this.setState({
      tagFeeds: updatedTagFeeds,
      today: today
    })
  }

  async bookmarkArticle(articleId: number) {
    const updatedTagFeeds = await ipcBookmarkArticle(articleId)
    const updatedToday = await getToday()
    this.setState({
      tagFeeds: updatedTagFeeds,
      today: updatedToday
    })
  }

  /** 
   * This callback is called when a component indicates that there has been a change to the data stored in the database
   * This will fetch all the data from the database again and update the shared state
   */
  async onDataChange() {
    const [tagFeeds, today] = await Promise.all([ipcRefreshFeeds(), getToday()])
    this.setState({
      tagFeeds,
      today
    })
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
              <FeedList
                onFeedIdChange={feedId => this.setState({ feedId })}
                onDataChange={this.onDataChange}
                feeds={this.state.tagFeeds} />
              {/* <FeedListOld
                loadArticle={this.setArticleId.bind(this)}
                tagFeeds={this.state.tagFeeds}
                today={this.state.today}
                refreshFeed={feedId => this.refreshFeed(feedId)}
                readArticle={articleId => this.readArticle(articleId)}
                bookmarkArticle={articleId => this.bookmarkArticle(articleId)} /> */}
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