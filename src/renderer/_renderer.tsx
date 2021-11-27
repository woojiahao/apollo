// import { Box, CircularProgress, createTheme, CssBaseline, Grid, Modal, ThemeProvider } from '@mui/material'
// import * as React from 'react'
// import * as ReactDOM from 'react-dom'
// import { SimpleArticle } from '../main/database/mappers/ArticleMapper'
// import { TagFeeds } from '../main/database/mappers/FeedMapper'
// import AddFeedDialog from './components/AddFeedDialog'
// import ArticleList from './components/_ArticleList'
// import ArticleViewer from './components/ArticleViewer'
// import NavigationBar from './components/_NavigationBar'
// import { bookmarkArticle as ipcBookmarkArticle, getTagFeeds, getToday, readArticle as ipcReadArticle, refreshFeeds as ipcRefreshFeeds } from './ipcInvoker'
// import './styles.css'

// declare module '@mui/material/styles' {
//   interface TypographyVariants {
//     appTitle: React.CSSProperties
//     sectionTitle: React.CSSProperties
//     wrapIcon: React.CSSProperties
//     wrapIconText: React.CSSProperties
//   }

//   interface TypographyVariantsOptions {
//     appTitle?: React.CSSProperties
//     sectionTitle?: React.CSSProperties
//     wrapIcon?: React.CSSProperties
//     wrapIconText?: React.CSSProperties
//   }
// }

// declare module '@mui/material/Typography' {
//   interface TypographyPropsVariantOverrides {
//     appTitle: true
//     sectionTitle: true
//     wrapIcon: true
//     wrapIconText: true
//   }
// }

// const headerFont = ['Rubik', 'Roboto', 'Lato', 'sans-serif'].join(',')
// const bodyFont = ['Lato', 'Roboto', 'sans-serif'].join(',')

// const globalTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#2860CD',
//       light: '#98C5F9'
//     },
//     secondary: {
//       main: '#F5594F'
//     }
//   },
//   typography: {
//     fontFamily: bodyFont,
//     fontSize: 16,
//     h1: {
//       fontFamily: headerFont,
//       fontSize: 28
//     },
//     h2: {
//       fontFamily: headerFont,
//       fontSize: 26
//     },
//     h3: {
//       fontFamily: headerFont,
//       fontSize: 24,
//       marginBottom: '0.5rem'
//     },
//     appTitle: {
//       color: '#98C5F9',
//       fontSize: 24,
//       fontWeight: 'bold',
//       letterSpacing: 6,
//       textTransform: 'uppercase',
//       fontFamily: headerFont
//     },
//     sectionTitle: {
//       color: '#FFFFFF',
//       fontSize: 20,
//       fontWeight: 'bold',
//       textTransform: 'uppercase',
//       fontFamily: headerFont
//     },
//     wrapIcon: {
//       display: 'flex',
//       flexDirection: 'row',
//       alignContent: 'center',
//       marginBottom: '0.8rem',
//       fill: '#FFFFFFF',
//       color: '#FFFFFF'
//     },
//     wrapIconText: {
//       marginLeft: '10px',
//       fontFamily: bodyFont,
//       fontSize: '1.2rem'
//     },
//     subtitle1: {
//       color: '#424242',
//       lineHeight: 1
//     },
//     subtitle2: {
//       color: '#424242',
//       lineHeight: 1
//     }
//   }
// })

// type IndexState = {
//   feedId: number,
//   articleId: number,
//   tagFeeds: TagFeeds,
//   today: SimpleArticle[],
//   isAddFeedDialogOpen: boolean,
//   isLoading: boolean
// }

// export default class Index extends React.Component<{}, IndexState> {
//   constructor(props) {
//     super(props)
//     this.state = {
//       feedId: undefined,
//       articleId: undefined,
//       tagFeeds: {},
//       today: [],
//       isAddFeedDialogOpen: false,
//       isLoading: false
//     }
//   }

//   async refreshTagFeeds() {
//     const tagFeeds = await getTagFeeds()
//     this.setState({
//       tagFeeds: tagFeeds,
//     })
//   }

//   async componentDidMount() {
//     await this.refreshFeeds()
//   }

//   setArticleId(articleId: number) {
//     this.setState({ articleId: articleId })
//   }

//   async closeAddFeedDialog() {
//     await this.refreshTagFeeds()
//     this.setState({ isAddFeedDialogOpen: false })
//   }

//   async refreshFeeds() {
//     this.setState({ isLoading: true })
//     const [updatedTagFeeds, updatedToday] = await Promise.all([ipcRefreshFeeds(), getToday()])
//     this.setState({
//       isLoading: false,
//       tagFeeds: updatedTagFeeds,
//       today: updatedToday
//     })
//   }

//   async readArticle(articleId: number) {
//     /// TODO: Figure out if there's a less expensive way to read an article and update the state
//     const updatedTagFeeds = await ipcReadArticle(articleId)
//     const today = await getToday()
//     this.setState({
//       tagFeeds: updatedTagFeeds,
//       today: today
//     })
//   }

//   async bookmarkArticle(articleId: number) {
//     const updatedTagFeeds = await ipcBookmarkArticle(articleId)
//     const updatedToday = await getToday()
//     this.setState({
//       tagFeeds: updatedTagFeeds,
//       today: updatedToday
//     })
//   }

//   /** 
//    * This callback is called when a component indicates that there has been a change to the data stored in the database
//    * This will fetch all the data from the database again and update the shared state
//    */
//   async onDataChange() {
//     const [tagFeeds, today] = await Promise.all([ipcRefreshFeeds(), getToday()])
//     this.setState({
//       tagFeeds,
//       today
//     })
//   }

//   render() {
//     return (
//       <ThemeProvider theme={globalTheme}>
//         <CssBaseline />
//         <Box sx={{ height: `100%`, overflow: `hidden` }}>
//           <Grid
//             container
//             sx={{ height: `100%` }}>

//             <Grid
//               item
//               xs={2}
//               sx={{
//                 height: '100vh',
//                 padding: '20px',
//                 boxSizing: 'border-box',
//                 backgroundColor: '#2860CD',
//                 overflowY: 'auto'
//               }}>

//               <NavigationBar
//                 tagFeeds={this.state.tagFeeds}
//                 onFeedIdChange={feedId => this.setState({ feedId })}
//                 onDataChange={this.onDataChange}
//                 onOpenAddFeedDialog={() => this.setState({ isAddFeedDialogOpen: true })}
//                 onRefreshFeeds={this.refreshFeeds}
//               />

//             </Grid>

//             <AddFeedDialog
//               open={this.state.isAddFeedDialogOpen}
//               tagFeeds={this.state.tagFeeds}
//               onClose={() => this.closeAddFeedDialog()} />

//             <Modal open={this.state.isLoading} onBackdropClick={() => null}>
//               <Box sx={{ display: 'flex', justifyContent: 'center', height: `100%`, alignItems: 'center' }}>
//                 <CircularProgress />
//               </Box>
//             </Modal>

//             <Grid item xs={3}
//               sx={{
//                 height: '100vh',
//                 padding: '30px',
//                 boxSizing: 'border-box',
//                 backgroundColor: '#98C5F9',
//                 overflowY: 'auto'
//               }}>
//               <ArticleList
//                 feedId={this.state.feedId}
//                 onArticleIdChange={articleId => this.setState({ articleId })} />
//             </Grid>

//             <Grid
//               item
//               xs
//               sx={{
//                 height: `100%`,
//                 overflowY: `auto`
//               }}>
//               <ArticleViewer articleId={this.state.articleId} />
//             </Grid>
//           </Grid>
//         </Box >
//       </ThemeProvider>
//     )
//   }
// }

// ReactDOM.render(<Index />, document.getElementById('app'))