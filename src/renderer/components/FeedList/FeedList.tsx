import LabelIcon from '@mui/icons-material/Label';
import { Divider, Menu, MenuItem, Theme, Typography } from "@mui/material";
import { withStyles } from '@mui/styles';
import { Box } from "@mui/system";
import React from "react";
import { TagFeeds } from '../../../main/database/mappers/FeedMapper';
import { refreshFeed as ipcRefreshFeed } from "../../ipcInvoker";

type FeedListProps = {
  /// Callback invoked when the user selects a feed, informs the Root application to change the feedId
  onFeedIdChange: (feedId: number) => void
  /// Callback invoked when the data from the database has been changed in some way -- usually by the context menu action
  onDataChange: () => void
  feeds: TagFeeds
}

type FeedListState = {
  feedContextMenu: {
    mouseX: number
    mouseY: number
    feedId: number
  }
}

export default class FeedList extends React.Component<FeedListProps, FeedListState> {
  constructor(props: FeedListProps) {
    super(props)
    this.state = {
      feedContextMenu: null
    }
  }

  async refreshFeed() {
    const { feedId } = this.state.feedContextMenu
    await ipcRefreshFeed(feedId)
    this.props.onDataChange()
  }

  onContextMenu(e: React.MouseEvent, feedId: number) {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    this.setState({
      feedContextMenu: {
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
        feedId: feedId
      }
    })
  }

  render() {
    return (
      <Box>
        <Box className="feed-list">
          {Object.entries(this.props.feeds).map(([tag, feeds]) => {
            return (
              <ul>
                <Typography className="wrap-icon">
                  <LabelIcon /> {tag}
                </Typography>
                {feeds.map(feed => {
                  return (
                    <li>
                      <Typography
                        component="div"
                        onContextMenu={(e: React.MouseEvent) => this.onContextMenu(e, feed.feedId)}
                        onDoubleClick={() => this.props.onFeedIdChange(feed.feedId)}>
                        {/* TODO: Add unred icon if applicable */}
                        {feed.feedTitle}
                      </Typography>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </Box>

        <Menu
          open={this.state.feedContextMenu !== null}
          onClose={() => this.setState({ feedContextMenu: null })}
          anchorReference="anchorPosition"
          anchorPosition={
            this.state.feedContextMenu ?
              { top: this.state.feedContextMenu.mouseY, left: this.state.feedContextMenu.mouseX } :
              undefined
          }>
          <MenuItem onClick={this.refreshFeed}>Refresh Feed</MenuItem>
          <MenuItem>Rename Feed</MenuItem>
          <MenuItem>Edit Feed Update Interval</MenuItem>
          <Divider />
          <MenuItem>Delete Feed</MenuItem>
        </Menu>
      </Box >
    )
  }
}