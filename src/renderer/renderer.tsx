import { Box, CircularProgress, Grid, Modal } from '@mui/material'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RSS } from '../main/rss/data'
import AddFeedDialog from './components/AddFeedDialog'
import Feed from './components/Feed'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import { getTagFeeds, refreshFeed as ipcRefreshFeed, refreshFeeds as ipcRefreshFeeds } from './ipcInvoker'
import './styles.css'

type IndexState = {
  articleId: number,
  tagFeeds: RSS.TagFeeds,
  isAddFeedDialogOpen: boolean,
  isLoading: boolean
}

export default class Index extends React.Component<{}, IndexState> {
  constructor(props) {
    super(props)
    this.state = {
      articleId: undefined,
      tagFeeds: {},
      isAddFeedDialogOpen: false,
      isLoading: false
    }
  }

  async refreshTagFeeds() {
    const tagFeeds = await getTagFeeds()
    this.setState({ tagFeeds: tagFeeds })
  }

  async componentDidMount() {
    await this.refreshTagFeeds()
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
    ipcRefreshFeeds().then(updatedTagFeeds => {
      this.setState({
        isLoading: false,
        tagFeeds: updatedTagFeeds
      })
    })
  }

  async refreshFeed(rssUrl: string) {
    const updatedTagFeeds = await ipcRefreshFeed(rssUrl)
    this.setState({ tagFeeds: updatedTagFeeds })
  }

  render() {
    return (
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
              refreshFeed={rssUrl => this.refreshFeed(rssUrl)} />
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
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))