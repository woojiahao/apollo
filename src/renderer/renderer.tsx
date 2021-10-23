import { Box, Grid } from '@mui/material'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Feed from './components/Feed'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import './styles.css'

type IndexState = {
  feedURL: string
}

export default class Index extends React.Component<{}, IndexState> {
  constructor(props) {
    super(props)
    this.state = {
      feedURL: ''
    }
  }

  setFeedURL(url: string) {
    this.setState({
      feedURL: url
    })
  }

  render() {
    return (
      <Box sx={{ height: `100%`, overflow: `hidden` }}>
        <Grid
          container
          sx={{ height: `100%` }}>
          <Grid
            item
            direction="column"
            xs="auto"
            alignItems="flex-end">
            <Navigation />
          </Grid>

          <Grid
            item
            xs={3}
            sx={{
              height: `100vh`,
              padding: `16px`,
              boxSizing: `border-box`,
              backgroundColor: `#FBFBFB`
            }}>
            <Sidebar loadFeed={this.setFeedURL.bind(this)} />
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