// import LabelIcon from '@mui/icons-material/Label';
// import { Divider, Menu, MenuItem, Theme, Typography } from "@mui/material";
// import { withStyles, WithStyles } from '@mui/styles';
// import createStyles from '@mui/styles/createStyles';
// import { Box } from "@mui/system";
// import React from "react";
// import { TagFeeds } from '../../main/database/mappers/FeedMapper';
// import { refreshFeed as ipcRefreshFeed } from "../ipcInvoker";

// const styles = (theme: Theme) => createStyles({
//   feedList: {
//     '& ul': {
//       margin: 0,
//       marginBlockStart: 0,
//       marginBlockEnd: 0,
//       paddingInlineStart: 0,
//       '&:not(:last-child)': {
//         marginBottom: '0.8rem'
//       },
//       '& li': {
//         listStyleType: 'none',
//         marginLeft: '2rem',
//         '&:hover': {
//           cursor: 'pointer'
//         }
//       }
//     },
//   }
// });

// interface FeedListProps extends WithStyles<typeof styles> {
//   /// Callback invoked when the user selects a feed, informs the Root application to change the feedId
//   onFeedIdChange: (feedId: number) => void
//   /// Callback invoked when the data from the database has been changed in some way -- usually by the context menu action
//   onDataChange: () => void
//   feeds: TagFeeds
// }

// type FeedListState = {
//   feedContextMenu: {
//     mouseX: number
//     mouseY: number
//     feedId: number
//   }
// }

// class FeedList extends React.Component<FeedListProps, FeedListState> {
//   constructor(props: FeedListProps) {
//     super(props)
//     this.state = {
//       feedContextMenu: null
//     }
//   }

//   async refreshFeed() {
//     const { feedId } = this.state.feedContextMenu
//     await ipcRefreshFeed(feedId)
//     this.props.onDataChange()
//   }

//   onContextMenu(e: React.MouseEvent, feedId: number) {
//     e.preventDefault()
//     e.stopPropagation()
//     e.nativeEvent.stopImmediatePropagation()

//     this.setState({
//       feedContextMenu: {
//         mouseX: e.clientX - 2,
//         mouseY: e.clientY - 4,
//         feedId: feedId
//       }
//     })
//   }

//   render() {
//     const { classes } = this.props

//     return (
//       <Box>
//         <Box className={classes.feedList}>
//           {Object.entries(this.props.feeds).map(([tag, feeds]) => {
//             return (
//               <ul key={tag}>
//                 <Typography variant="wrapIcon">
//                   <LabelIcon /> <Typography component="span" variant="wrapIconText">{tag}</Typography>
//                 </Typography>
//                 {feeds.map(feed => {
//                   return (
//                     <li key={feed.feedId}>
//                       <Typography
//                         component="div"
//                         onContextMenu={(e: React.MouseEvent) => this.onContextMenu(e, feed.feedId)}
//                         onClick={() => this.props.onFeedIdChange(feed.feedId)}>
//                         {/* TODO: Add unred icon if applicable */}
//                         {feed.feedTitle}
//                       </Typography>
//                     </li>
//                   )
//                 })}
//               </ul>
//             )
//           })}
//         </Box>

//         <Menu
//           open={this.state.feedContextMenu !== null}
//           onClose={() => this.setState({ feedContextMenu: null })}
//           anchorReference="anchorPosition"
//           anchorPosition={
//             this.state.feedContextMenu ?
//               { top: this.state.feedContextMenu.mouseY, left: this.state.feedContextMenu.mouseX } :
//               undefined
//           }>
//           <MenuItem onClick={this.refreshFeed}>Refresh Feed</MenuItem>
//           <MenuItem>Rename Feed</MenuItem>
//           <MenuItem>Edit Feed Update Interval</MenuItem>
//           <Divider />
//           <MenuItem>Delete Feed</MenuItem>
//         </Menu>
//       </Box >
//     )
//   }
// }

// export default withStyles(styles)(FeedList)