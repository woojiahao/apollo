import { Autocomplete, Box, Button, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, TextField, Typography } from "@mui/material";
import React from "react";
import { RSS } from "../../main/rss/data";
import { addFeed, getFeed } from "../ipcInvoker";

type AddFeedDialogProps = {
  open: boolean
  tagFeeds: RSS.TagFeeds
  onClose: () => void
}

type AddFeedDialogState = {
  isFinalStep: boolean
  isLoading: boolean
  feedUrl: string
  feedName: string
  feedTag: string
  feed: RSS.Feed
}

export default class AddFeedDialog extends React.Component<AddFeedDialogProps, AddFeedDialogState> {
  constructor(props: AddFeedDialogProps) {
    super(props)

    this.state = {
      isFinalStep: false,
      isLoading: false,
      feedUrl: '',
      feedName: '',
      feedTag: '',
      feed: undefined
    }
  }

  async downloadFeed() {
    this.setState({
      isLoading: true
    })
    const feedUrl = this.state.feedUrl
    getFeed(feedUrl).then(feed => {
      this.setState({
        isLoading: false,
        feed: feed,
        feedName: feed.title,
        isFinalStep: true
      })
    })
  }

  async addFeed() {
    this.setState({
      isLoading: true,
    })
    const updatedFeedWithName: RSS.Feed = Object.assign({}, this.state.feed)
    updatedFeedWithName.title = this.state.feedName
    const tag = this.state.feedTag === 'Uncategorized' ? null : this.state.feedTag
    addFeed(updatedFeedWithName, this.state.feedUrl, tag).then(newFeed => {
      this.closeDialog()
    })
  }

  closeDialog() {
    /// Clean up the internal state for next use
    this.setState({
      isFinalStep: false,
      isLoading: false,
      feedUrl: '',
      feedName: '',
      feedTag: '',
      feed: undefined
    })

    /// Parent component will handle the rest of the information
    this.props.onClose()
  }

  render() {
    const filter = createFilterOptions<string>()

    return (
      // TODO: Add error handling to reset the state of the dialog
      <Dialog open={this.props.open} onClose={() => this.props.onClose()}>
        <DialogTitle>Add Feed</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Enter feed URL to subscribe to:
          </DialogContentText>

          <TextField
            autoFocus
            id="feed-url"
            label="Feed URL"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={this.state.isFinalStep}
            sx={{ width: 400 }}
            onChange={e => { this.setState({ feedUrl: e.target.value }) }} />

          <Box style={{ display: this.state.isFinalStep ? `block` : `none` }}>
            <TextField
              autoFocus
              id="feed-name"
              label="Feed Name"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={this.state.feedName}
              disabled={!this.state.isFinalStep}
              sx={{ width: 400 }}
              onChange={e => { this.setState({ feedName: e.target.value }) }} />

            <Autocomplete
              value={this.state.feedTag}
              disabled={!this.state.isFinalStep}
              onChange={(_e, newValue) => {
                this.setState({ feedTag: newValue, });
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
              options={Object.keys(this.props.tagFeeds)}
              getOptionLabel={option => option}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              sx={{ width: 400 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Tag Select" />
              )}
            />
          </Box>

          <Box style={{ display: this.state.isLoading ? `block` : `none` }} >
            {this.state.isFinalStep ?
              <Typography>Adding Feed...</Typography> :
              <Typography>Downloading Feed...</Typography>}

            <LinearProgress />
          </Box>

        </DialogContent>

        <DialogActions>
          {/* TODO: Handle last minute cancellations */}
          <Button disabled={this.state.isLoading} onClick={() => this.closeDialog()}>Cancel</Button>
          {this.state.isFinalStep ?
            <Button disabled={this.state.isLoading} onClick={() => this.addFeed()}>Done</Button> :
            <Button disabled={this.state.isLoading} onClick={() => this.downloadFeed()}>Add</Button>}
        </DialogActions>
      </Dialog >
    )
  }
}