import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TagFeeds } from '../../main/database/mappers/FeedMapper';
import FeedList from './FeedList';

type NavigationBarProps = {
  onFeedIdChange: (feedId: number) => void
  openAddFeedDialog: () => void
  refreshFeeds: () => void
  tagFeeds: TagFeeds
}

export default class NavigationBar extends React.Component<NavigationBarProps> {
  constructor(props: NavigationBarProps) {
    super(props)
  }

  simplifyTagFeeds(tagFeeds: TagFeeds) {
    const simplified: { [tag: string]: string[] } = {}
    for (const [tag, feeds] of Object.entries(tagFeeds)) {
      if (!(tag in simplified)) simplified[tag] = []

    }
  }

  render() {
    return (
      <Box
        sx={{
          height: `100vh`,
          backgroundColor: `#14213D`,
          padding: `8px`,
          boxSizing: `border-box`
        }}>

        <Stack direction="row" justifyContent="space-between">
          {/* TODO: Style the title */}
          <Typography variant="h2" letterSpacing="6" sx={{ textTransform: 'uppercase' }}>Apollo</Typography>
          <IconButton aria-label="settings" onClick={() => console.log('opening settings')}>
            <SettingsIcon sx={{ fontSize: '1em', fill: '#fff' }} />
          </IconButton>
        </Stack>

        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>Feeds</Typography>

            <Stack direction="row" spacing={3}>
              <IconButton aria-label="refresh-feeds" onClick={this.props.refreshFeeds}>
                <RefreshIcon sx={{ fontSize: '1em', fill: '#fff' }} />
              </IconButton>

              <IconButton aria-label="add-feed" onClick={this.props.openAddFeedDialog}>
                <AddCircleIcon sx={{ fontSize: '1em', fill: '#fff' }} />
              </IconButton>
            </Stack>
          </Stack>

          <FeedList
            feeds={
              Object.entries(this.props.tagFeeds)
                .map(([tag, feeds]) => { return { tag: feeds.map(f => f.feedTitle) } })
            } />
        </Box>
      </Box>
    )
  }
}