import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TodayIcon from '@mui/icons-material/Today';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import TreeItem, { TreeItemContentProps, TreeItemProps, useTreeItem } from "@mui/lab/TreeItem";
import TreeView from '@mui/lab/TreeView';
import { Divider, Menu, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import React from "react";
import { RSS } from '../../main/rss/data';

type SidebarProps = {
  loadArticle: (articleId: number) => void,
  tagFeeds: RSS.TagFeeds,
  refreshFeed: (feedId: number) => void
}

type SidebarState = {
  feedContextMenu: {
    mouseX: number,
    mouseY: number,
    feedId: number
  }
  articleContextMenu: {
    mouseX: number,
    mouseY: number,
    articleId: number
  }
}

const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    onContextMenu,
    onClick
  } = props

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    preventSelection
  } = useTreeItem(nodeId)

  const icon = iconProp || expansionIcon || displayIcon

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event)
  }

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={onClick}
        onContextMenu={onContextMenu}
        component="div"
        className={classes.label}>
        {label}
      </Typography>
    </div>
  )
})

const CustomTreeItem = (props: TreeItemProps) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
)

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props)
    this.state = {
      feedContextMenu: null,
      articleContextMenu: null
    }
  }

  handleContextMenu(e: React.MouseEvent, type: 'feed' | 'article', id: number) {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    const mouseX = e.clientX - 2
    const mouseY = e.clientY - 4

    switch (type) {
      case 'feed':
        this.setState({
          feedContextMenu: {
            mouseX,
            mouseY,
            feedId: id
          },
          articleContextMenu: null
        })
        break
      case 'article':
        this.setState({
          articleContextMenu: {
            mouseX,
            mouseY,
            articleId: id
          },
          feedContextMenu: null
        })
        break
    }
  }

  refreshFeed() {
    this.props.refreshFeed(this.state.feedContextMenu.feedId)
    this.setState({ feedContextMenu: null })
  }

  render() {
    let counter = 3
    return (
      <Box>
        <TreeView aria-label="navigation"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: `100%` }}>
          <CustomTreeItem nodeId="1" key="Today" label="Today" icon={<TodayIcon />} />
          <CustomTreeItem nodeId="2" key="Bookmarks" label="Bookmarks" icon={<BookmarksIcon />} />

          <Typography>Feed</Typography>

          {Object.entries(this.props.tagFeeds).map(([tag, feeds]) => {
            return (
              <div>
                <CustomTreeItem key={tag} nodeId={`${counter++}`} label={tag}>
                  {feeds.map(({ feedId, feedTitle, rssUrl, articles }) => {
                    return (
                      <CustomTreeItem
                        nodeId={`${counter++}`}
                        key={feedTitle + counter.toString()}
                        onContextMenu={e => this.handleContextMenu(e, 'feed', feedId)}
                        label={feedTitle}>
                        {articles.map(({ articleTitle, articleId }) => {
                          return (
                            <CustomTreeItem nodeId={`${counter++}`}
                              key={feedTitle + articleTitle + counter.toString()}
                              label={articleTitle}
                              onContextMenu={e => this.handleContextMenu(e, 'article', articleId)}
                              onClick={() => this.props.loadArticle(articleId)} />
                          )
                        })}
                      </CustomTreeItem>
                    )
                  })}
                </CustomTreeItem>
              </div>
            )
          })}
        </TreeView>

        <Menu
          open={this.state.feedContextMenu !== null}
          onClose={() => this.setState({ feedContextMenu: null })}
          anchorReference="anchorPosition"
          anchorPosition={this.state.feedContextMenu ? { top: this.state.feedContextMenu.mouseY, left: this.state.feedContextMenu.mouseX } : undefined}>
          <MenuItem onClick={() => this.refreshFeed()}>Refresh Feed</MenuItem>
          <MenuItem>Rename Feed</MenuItem>
          <MenuItem>Edit Feed Update Interval</MenuItem>
          <Divider />
          <MenuItem>Delete Feed</MenuItem>
        </Menu>

        <Menu
          open={this.state.articleContextMenu !== null}
          onClose={() => this.setState({ articleContextMenu: null })}
          anchorReference="anchorPosition"
          anchorPosition={this.state.articleContextMenu ? { top: this.state.articleContextMenu.mouseY, left: this.state.articleContextMenu.mouseX } : undefined}>
          <MenuItem>Bookmark</MenuItem>
          <Divider />
          <MenuItem>Mark as Read</MenuItem>
        </Menu>
      </Box>
    )
  }
}