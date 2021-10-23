import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from "@mui/lab/TreeItem";
import TreeView from '@mui/lab/TreeView';
import Box from '@mui/material/Box';
import React from "react";
// import "./Sidebar.css";

type SidebarProps = {
  loadFeed: (url: string) => void
}

export default class Sidebar extends React.Component<SidebarProps> {
  constructor(props: SidebarProps) {
    super(props)
  }

  render() {
    return (
      <Box>
        <TreeView aria-label="navigation"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: `100%` }}>
          <TreeItem nodeId="1" label="Today" />
          <TreeItem nodeId="2" label="Bookmarks" />

          <p>Feed</p>

          <TreeItem nodeId="3" label="All" />
          <TreeItem nodeId="4" label="Programming">
            <TreeItem nodeId="5" label="A Programmer's Perspective" onClick={() => this.props.loadFeed('https://woojiahao.github.io/rss.xml')} />
            <TreeItem nodeId="6" label="SlashDot" onClick={() => this.props.loadFeed('http://rss.slashdot.org/Slashdot/slashdotMain')} />
          </TreeItem>
          <TreeItem nodeId="7" label="Uncategorized" />
        </TreeView>
      </Box>
    )
  }
}