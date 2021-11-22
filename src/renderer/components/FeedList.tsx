import React from "react";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import TreeItem from "./TreeView/TreeItem";
import TreeView from "./TreeView/TreeView";

interface FeedListProps {
  tagFeeds: TagFeeds
}

export default class FeedList extends React.Component<FeedListProps> {
  constructor(props: FeedListProps) {
    super(props)
  }

  render() {
    return (
      <div>
        {Object.entries(this.props.tagFeeds).map(([tag, feeds]) => {
          return (
            <TreeView title={tag} key={tag}>
              {feeds.map(feed => {
                return (
                  <TreeItem key={feed.feedId}>
                    {feed.feedTitle}
                  </TreeItem>
                )
              })}
            </TreeView>
          )
        })}
      </div>
    )
  }
}