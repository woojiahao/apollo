import React from "react";
import { BiNews } from 'react-icons/bi';
import { BsFillBookmarkFill, BsFillInboxesFill } from 'react-icons/bs';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdLabel, MdLabelOutline } from 'react-icons/md';
import "./Navigation.css";

type NavigationProps = {
  loadFeed: (url: string) => void
}

export default class Navigation extends React.Component<NavigationProps> {
  constructor(props: NavigationProps) {
    super(props)
  }

  render() {
    return (
      <div className="nav">
        <ul className="nav-general">
          <li><span><BiNews /> Today</span></li>
          <li><span><BsFillBookmarkFill /> Bookmarks</span></li>
        </ul>

        <h4>Feed</h4>
        <ul className="nav-feed">
          <li><span><BsFillInboxesFill /> All</span></li>
          {/* TODO: Set this to be dynamically generated */}
          <li>
            <span><MdLabelOutline /> Programming</span>
            <ul className="nav-expanded">
              <li><span onClick={() => this.props.loadFeed('https://woojiahao.github.io/rss.xml')}><IoMdArrowDropright /> A Programmer's Perspective</span></li>
              <li><span onClick={() => this.props.loadFeed('http://rss.slashdot.org/Slashdot/slashdotMain')}><IoMdArrowDropright />SlashDot</span></li>
            </ul>
          </li>
          <li><span><MdLabel /> Uncategorized</span></li>
        </ul>
      </div>
    )
  }
}