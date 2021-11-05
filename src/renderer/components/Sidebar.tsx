import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from "@mui/lab/TreeItem";
import TreeView from '@mui/lab/TreeView';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from "react";
import { RSS } from '../../main/rss/data';

type SidebarProps = {
  loadFeed: (url: string) => void,
  tagFeeds: RSS.TagFeeds
}

export default class Sidebar extends React.Component<SidebarProps> {
  constructor(props: SidebarProps) {
    super(props)
  }

  render() {
    let counter = 4
    return (
      <Box>
        <TreeView aria-label="navigation"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: `100%` }}>
          <TreeItem nodeId="1" key="Today" label="Today" />
          <TreeItem nodeId="2" key="Bookmarks" label="Bookmarks" />

          <Typography>Feed</Typography>

          <TreeItem nodeId="3" key="All" label="All">
            {Object.values(this.props.tagFeeds).reduce((acc, cur) => acc.concat(cur), []).map(({ feedTitle, rssUrl }) => {
              return (
                <TreeItem
                  nodeId={`${counter++}`}
                  key={feedTitle + counter.toString()}
                  label={feedTitle}
                  onClick={() => this.props.loadFeed(rssUrl)} />
              )
            })}
          </TreeItem>

          {Object.entries(this.props.tagFeeds).map(([tag, feeds]) => {
            return (
              <div>
                <TreeItem key={tag} nodeId={`${counter++}`} label={tag}>
                  {feeds.map(({ feedTitle, rssUrl }) => {
                    return (
                      <TreeItem
                        nodeId={`${counter++}`}
                        key={feedTitle + counter.toString()}
                        label={feedTitle}
                        onClick={() => this.props.loadFeed(rssUrl)} />
                    )
                  })}
                </TreeItem>
              </div>
            )
          })}
        </TreeView>
      </Box>
    )
  }
}