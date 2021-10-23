import React from "react";
import { BiNews } from 'react-icons/bi';
import { BsFillBookmarkFill, BsFillInboxesFill } from 'react-icons/bs';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdLabel, MdLabelOutline } from 'react-icons/md';
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from "@mui/lab/TreeItem";
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
      <div className="nav">
        <TreeView aria-label="navigation"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}>
          <TreeItem nodeId="1" label="Today" />
          <TreeItem nodeId="2" label="Bookmarks" />
          <span>Feed</span>
          <TreeItem nodeId="3" label="All" />
          <TreeItem nodeId="4" label="Programming">
            <TreeItem nodeId="5" label="A Programmer's Perspective" />
            <TreeItem nodeId="6" label="SlashDot" />
          </TreeItem>
          <TreeItem nodeId="7" label="Uncategorized" />
        </TreeView>
        {/* <ul className="nav-general">
          <li><span><BiNews /> Today</span></li>
          <li><span><BsFillBookmarkFill /> Bookmarks</span></li>
        </ul>

        <h4>Feed</h4>
        <ul className="nav-feed"> */}
          {/* <li><span><BsFillInboxesFill /> All</span></li> */}
          {/* TODO: Set this to be dynamically generated */}
          {/* <li>
            <span><MdLabelOutline /> Programming</span>
            <ul className="nav-expanded">
              <li><span onClick={() => this.props.loadFeed('https://woojiahao.github.io/rss.xml')}><IoMdArrowDropright /> A Programmer's Perspective</span></li>
              <li><span onClick={() => this.props.loadFeed('http://rss.slashdot.org/Slashdot/slashdotMain')}><IoMdArrowDropright />SlashDot</span></li>
            </ul>
          </li>
          <li><span><MdLabel /> Uncategorized</span></li>
        </ul> */}
      </div>
    )
  }
}