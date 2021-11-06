import { Box, Grid } from '@mui/material'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RSS } from '../main/rss/data'
import AddFeedDialog from './components/AddFeedDialog'
import Feed from './components/Feed'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import { getTagFeeds } from './ipcInvoker'
import './styles.css'


type IndexState = {
  feedURL: string,
  tagFeeds: RSS.TagFeeds,
  isAddFeedDialogOpen: boolean
}

export default class Index extends React.Component<{}, IndexState> {
  constructor(props) {
    super(props)
    this.state = {
      feedURL: '',
      tagFeeds: {},
      isAddFeedDialogOpen: false
    }
  }

  async refreshTagFeeds() {
    const tagFeeds = await getTagFeeds()
    this.setState({ tagFeeds: tagFeeds })
  }

  async componentDidMount() {
    await this.refreshTagFeeds()
  }

  setFeedURL(url: string) {
    this.setState({ feedURL: url })
  }

  openAddFeedDialog() {
    this.setState({ isAddFeedDialogOpen: true })
  }

  async closeAddFeedDialog() {
    await this.refreshTagFeeds()
    this.setState({ isAddFeedDialogOpen: false })
  }

  render() {
    return (
      <Box sx={{ height: `100%`, overflow: `hidden` }}>
        <Grid
          container
          sx={{ height: `100%` }}>
          <Grid item xs="auto" alignItems="flex-end">
            <Navigation
              onOpenAddFeedDialog={() => this.openAddFeedDialog()} />
          </Grid>

          <AddFeedDialog
            open={this.state.isAddFeedDialogOpen}
            tagFeeds={this.state.tagFeeds}
            onClose={() => this.closeAddFeedDialog()} />

          <Grid
            item
            xs={3}
            sx={{
              height: `100vh`,
              padding: `16px`,
              boxSizing: `border-box`,
              backgroundColor: `#FBFBFB`
            }}>
            <Sidebar loadFeed={this.setFeedURL.bind(this)} tagFeeds={this.state.tagFeeds} />
          </Grid>

          <Grid
            item
            xs
            sx={{
              height: `100%`,
              overflowY: `auto`
            }}>
            <Feed feedURL={this.state.feedURL} />
          </Grid>
        </Grid>
      </Box>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))