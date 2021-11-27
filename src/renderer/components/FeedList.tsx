import React from "react";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import TreeItem from "./TreeView/TreeItem";
import TreeView from "./TreeView/TreeView";

interface FeedListProps {
  tagFeeds: TagFeeds
  onFeedSelect: (id: number) => void
}

const FeedList = ({ tagFeeds, onFeedSelect }: FeedListProps) => {
  return (
    <div>
      {Object.entries(tagFeeds).map(([tag, feeds]) => {
        return (
          <TreeView title={tag} key={tag}>
            {feeds.map(feed => {
              return (
                <TreeItem onClick={() => onFeedSelect(feed.id)} id={feed.id}>
                  {feed.title}
                </TreeItem>
              )
            })}
          </TreeView>
        )
      })}
    </div>

  )
}

export default FeedList