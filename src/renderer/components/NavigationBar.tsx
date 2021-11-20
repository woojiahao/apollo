import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TagFeeds } from '../../main/database/mappers/FeedMapper';
import FeedList from './FeedList/FeedList';

type NavigationBarProps = {
  tagFeeds: TagFeeds
  onFeedIdChange: (feedId: number) => void
  onDataChange: () => void
  onOpenAddFeedDialog: () => void
  onRefreshFeeds: () => void
}

export default class NavigationBar extends React.Component<NavigationBarProps> {
  constructor(props: NavigationBarProps) {
    super(props)
  }

  render() {
    return (
      <Box>
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
              <IconButton aria-label="refresh-feeds" onClick={this.props.onRefreshFeeds}>
                <RefreshIcon sx={{ fontSize: '1em', fill: '#fff' }} />
              </IconButton>

              <IconButton aria-label="add-feed" onClick={this.props.onOpenAddFeedDialog}>
                <AddCircleIcon sx={{ fontSize: '1em', fill: '#fff' }} />
              </IconButton>
            </Stack>
          </Stack>

          <FeedList
            feeds={this.props.tagFeeds}
            onFeedIdChange={this.props.onFeedIdChange}
            onDataChange={this.props.onDataChange} />
        </Box>
      </Box>
    )
  }
}