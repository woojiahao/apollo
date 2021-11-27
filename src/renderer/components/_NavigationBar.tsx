// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import SettingsIcon from '@mui/icons-material/Settings';
// import TodayIcon from '@mui/icons-material/Today';
// import BookmarksIcon from '@mui/icons-material/Bookmarks';
// import { IconButton, Stack, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";
// import { TagFeeds } from '../../main/database/mappers/FeedMapper';
// import FeedList from './_FeedList';

// type NavigationBarProps = {
//   tagFeeds: TagFeeds
//   onFeedIdChange: (feedId: number) => void
//   onDataChange: () => void
//   onOpenAddFeedDialog: () => void
//   onRefreshFeeds: () => void
// }

// export default class NavigationBar extends React.Component<NavigationBarProps> {
//   constructor(props: NavigationBarProps) {
//     super(props)
//   }

//   render() {
//     return (
//       <Box>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           {/* TODO: Style the title */}
//           <Typography variant="appTitle">Apollo</Typography>
//           <IconButton aria-label="settings" onClick={() => console.log('opening settings')}>
//             <SettingsIcon sx={{ fill: '#fff' }} />
//           </IconButton>
//         </Stack>

//         <Stack>
//           <Typography variant="wrapIcon" sx={{}}>
//             <TodayIcon /> <Typography component="span" variant="wrapIconText">Today</Typography>
//           </Typography>

//           <Typography variant="wrapIcon">
//             <BookmarksIcon /> <Typography component="span" variant="wrapIconText">Bookmarks</Typography>
//           </Typography>
//         </Stack>

//         <Box>
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Typography variant="sectionTitle">Feeds</Typography>

//             <Stack direction="row" spacing={3}>
//               <IconButton aria-label="refresh-feeds" onClick={this.props.onRefreshFeeds}>
//                 <RefreshIcon sx={{ fill: '#fff' }} />
//               </IconButton>

//               <IconButton aria-label="add-feed" onClick={this.props.onOpenAddFeedDialog}>
//                 <AddCircleIcon sx={{ fill: '#fff' }} />
//               </IconButton>
//             </Stack>
//           </Stack>

//           <FeedList
//             feeds={this.props.tagFeeds}
//             onFeedIdChange={this.props.onFeedIdChange}
//             onDataChange={this.props.onDataChange} />
//         </Box>
//       </Box>
//     )
//   }
// }