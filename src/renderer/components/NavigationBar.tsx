import React from "react";
import { MdBookmarks, MdToday } from "react-icons/md"
import WrapIcon from "./WrapIcon";

export default class NavigationBar extends React.Component {
  render() {
    return (
      <div className="container bg-background h-screen border-box py-6">
        <WrapIcon icon={<MdToday />} content="Today" />
        <WrapIcon icon={<MdBookmarks />} content="Bookmarks" />
      </div>
    )
  }
}