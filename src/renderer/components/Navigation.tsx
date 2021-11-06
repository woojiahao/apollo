import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React from "react";

type NavigationState = {
  openAddFeed: boolean,
  openRefreshFeed: boolean,
  openEditFeed: boolean,
  openSettings: boolean
}

type NavigationProps = {
  onOpenAddFeedDialog: () => void,
}

export default class Navigation extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props)

    this.state = {
      openAddFeed: false,
      openRefreshFeed: false,
      openEditFeed: false,
      openSettings: false
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
        <Stack
          spacing={2}
          justifyContent="end"
          sx={{ height: `100%` }}>
          <IconButton aria-label="add-feed" onClick={() => { this.props.onOpenAddFeedDialog() }} >
            <AddOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          </IconButton>

          <IconButton aria-label="refresh-feed">
            <RefreshOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          </IconButton>

          <IconButton aria-label="edit-feed">
            <EditOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          </IconButton>

          <IconButton aria-label="settings">
            <SettingsOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          </IconButton>
        </Stack>
      </Box>
    )
  }
}