import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Stack } from "@mui/material";
import { Box } from '@mui/system';
import React from "react";

export default class Navigation extends React.Component {
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
          sx={{
            height: `100%`
          }}>
          <SettingsOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          <RefreshOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          <AddOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          <EditOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
        </Stack>
      </Box>
    )
  }
}