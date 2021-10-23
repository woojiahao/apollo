import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Stack } from "@mui/material";
import React from "react";

export default class Navigation extends React.Component {
  render() {
    return (
      <Stack
        spacing={2}
        justifyContent="end"
        sx={{
          backgroundColor: `#14213D`,
          padding: `8px`,
          height: `100%`,
          boxSizing: `border-box`
        }}>
        <SettingsOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
        <RefreshOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
        <AddOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
        <EditOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
      </Stack>
    )
  }
}