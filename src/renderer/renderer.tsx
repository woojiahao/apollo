import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RSS } from '../main/data'
import { pullChanges } from './../main/rss'
import { App } from './components/App'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import './styles.css'

type IndexState = {
  feedURL: string
}

export default class Index extends React.Component<{}, IndexState> {
  constructor(props) {
    super(props)
    this.state = {
      feedURL: ''
    }
  }

  setFeedURL(url: string) {
    this.setState({
      feedURL: url
    })
  }

  render() {
    return (
      <App>
        <Navigation />
        <Sidebar loadFeed={this.setFeedURL.bind(this)} />
        <Feed feedURL={this.state.feedURL} />
      </App >
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))