import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from "react";
import { addFeed } from './../ipcInvoker';

type NavigationState = {
  openAddFeed: boolean,
  addFeedUrl: string,
  tag: string,
  openRefreshFeed: boolean,
  openEditFeed: boolean,
  openSettings: boolean
}

type NavigationProps = {
  availableTags: string[],
  onTagsUpdate: (updatedTags: string[]) => void
}

export default class Navigation extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props)

    this.state = {
      openAddFeed: false,
      addFeedUrl: '',
      tag: 'Uncategorized',
      openRefreshFeed: false,
      openEditFeed: false,
      openSettings: false
    }
  }

  openAddFeedDialog() {
    this.setState({ openAddFeed: true, addFeedUrl: '' })
  }
  closeAddFeedDialog() {
    this.setState({ openAddFeed: false, addFeedUrl: '' })
  }

  async addFeed() {
    const feedUrl = this.state.addFeedUrl
    const tag = this.state.tag
    // TODO: Figure out more elegant way of handling Uncategorized tag
    const updatedTags = await addFeed(feedUrl, tag === 'Uncategorized' ? null : tag)
    this.props.onTagsUpdate(updatedTags)
    this.closeAddFeedDialog()
  }

  render() {
    const filter = createFilterOptions<string>()

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
          <IconButton aria-label="add-feed" onClick={() => { this.openAddFeedDialog() }} >
            <AddOutlinedIcon sx={{ fontSize: 30, fill: `#fff` }} />
          </IconButton>
          <Dialog open={this.state.openAddFeed} onClose={() => { this.closeAddFeedDialog() }}>
            <DialogTitle>Add Feed</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter feed URL to subscribe to:
              </DialogContentText>
              <TextField
                autoFocus
                id="feedURL"
                label="Feed URL"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={e => { this.setState({ addFeedUrl: e.target.value }) }}
              />

              <Autocomplete
                value={this.state.tag}
                onChange={(_e, newValue) => {
                  this.setState({
                    tag: newValue,
                  });
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some((option) => inputValue === option);
                  if (inputValue !== '' && !isExisting) {
                    filtered.push(inputValue)
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="tag-select"
                options={this.props.availableTags}
                getOptionLabel={option => option}
                renderOption={(props, option) => <li {...props}>{option}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Tag Select" />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.closeAddFeedDialog() }}>Cancel</Button>
              <Button onClick={() => { this.addFeed() }}>Add</Button>
            </DialogActions>
          </Dialog>

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