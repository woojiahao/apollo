import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  refreshFeed: (rssUrl: string) => void
}

type SidebarState = {
  feedContextMenu: {
    mouseX: number,
    mouseY: number
  }
  articleContextMenu: {
    mouseX: number,
    mouseY: number
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

  handleContextMenu(e: React.MouseEvent, isFeed: boolean) {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    if (isFeed) {
      this.setState({
        feedContextMenu: {
          mouseX: e.clientX - 2,
          mouseY: e.clientY - 4
        }
      })
    } else {
      this.setState({
        articleContextMenu: {
          mouseX: e.clientX - 2,
          mouseY: e.clientY - 4
        }
      })
    }

    console.log('opening feed context menu')
    console.log(e)

    const selectedFeedItem = e.target
    console.log(selectedFeedItem)
  }

  render() {
    let counter = 4
    return (
      <Box>
        <TreeView aria-label="navigation"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: `100%` }}>
          <CustomTreeItem nodeId="1" key="Today" label="Today" />
          <CustomTreeItem nodeId="2" key="Bookmarks" label="Bookmarks" />

          <Typography>Feed</Typography>

          <CustomTreeItem nodeId="3" key="All" label="All">
            {Object.values(this.props.tagFeeds).reduce((acc, cur) => acc.concat(cur), []).map(({ feedTitle, rssUrl, articles }) => {
              return (
                <CustomTreeItem
                  nodeId={`${counter++}`}
                  key={feedTitle + counter.toString()}
                  data-rssurl={rssUrl}
                  onContextMenu={e => this.handleContextMenu(e, true)}
                  label={feedTitle}>
                  {articles.map(({ articleTitle, articleId }) => {
                    return (
                      <CustomTreeItem nodeId={`${counter++}`}
                        key={feedTitle + articleTitle + counter.toString()}
                        label={articleTitle}
                        onClick={() => this.props.loadArticle(articleId)}
                        onContextMenu={e => this.handleContextMenu(e, false)} />
                    )
                  })}
                </CustomTreeItem>
              )
            })}
          </CustomTreeItem>

          {Object.entries(this.props.tagFeeds).map(([tag, feeds]) => {
            return (
              <div>
                <CustomTreeItem key={tag} nodeId={`${counter++}`} label={tag}>
                  {feeds.map(({ feedTitle, rssUrl, articles }) => {
                    return (
                      <CustomTreeItem
                        nodeId={`${counter++}`}
                        key={feedTitle + counter.toString()}
                        data-rssurl={rssUrl}
                        label={feedTitle}>
                        {articles.map(({ articleTitle, articleId }) => {
                          return (
                            <CustomTreeItem nodeId={`${counter++}`}
                              key={feedTitle + articleTitle + counter.toString()}
                              label={articleTitle}
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
          anchorPosition={this.state.feedContextMenu ? { top: this.state.feedContextMenu.mouseX, left: this.state.feedContextMenu.mouseX } : undefined}>
          <MenuItem onClick={() => this.props.refreshFeed('https://woojiahao.github.io/rss.xml')}>Refresh Feed</MenuItem>
          <MenuItem>Rename Feed</MenuItem>
          <MenuItem>Edit Feed Update Interval</MenuItem>
          <Divider />
          <MenuItem>Delete Feed</MenuItem>
        </Menu>

        <Menu
          open={this.state.articleContextMenu !== null}
          onClose={() => this.setState({ articleContextMenu: null })}
          anchorReference="anchorPosition"
          anchorPosition={this.state.articleContextMenu ? { top: this.state.articleContextMenu.mouseX, left: this.state.articleContextMenu.mouseX } : undefined}>
          <MenuItem>Bookmark</MenuItem>
          <Divider />
          <MenuItem>Mark as Read</MenuItem>
        </Menu>
      </Box>
    )
  }
}