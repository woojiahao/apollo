import React from "react";
import { useNavigate } from "react-router";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import TreeItem from "./TreeView/TreeItem";
import TreeView from "./TreeView/TreeView";

interface FeedListProps {
  tagFeeds: TagFeeds
}

const FeedList = ({ tagFeeds }: FeedListProps) => {
  const navigate = useNavigate()

  return (
    <div>
      {Object.entries(tagFeeds).map(([tag, feeds]) => {
        return (
          <TreeView title={tag} key={tag}>
            {feeds.map(feed => {
              return (
                <TreeItem onClick={() => navigate(`/feed/${feed.id}`)} id={feed.id}>
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