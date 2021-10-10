import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RSS } from '../main/data'
import { pullChanges } from './../main/rss'
import { App } from './App'
import './styles.css'

type IndexStruct = {
  title: string,
  description: string,
  feed: Array<RSS.Item>
}

export default class Index extends React.Component<{}, IndexStruct> {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      feed: []
    }
  }

  async componentDidMount() {
    const feed = await pullChanges('https://woojiahao.github.io/rss.xml')
    this.setState({
      title: feed.title,
      description: feed.description,
      feed: feed.items.slice()
    })
  }

  render() {
    return (
      <App>
        <div className="heading">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
        </div>
        {this.state.feed.map(item => (
          <div className="item">
            <h3>{item.title}</h3>
            <em>{item.description}</em>
            <br />
            <p>Published on: <em>{item.pubDate.toUTCString()}</em></p>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        ))}
      </App >
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))