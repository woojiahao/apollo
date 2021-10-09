import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'
// import { pullChanges } from './../main/rss'

export const Index = () => {
  // const feed = pullChanges('https://woojiahao.github.io/rss.xml')
  // return <App>{feed}</App>
  return <App>Hello</App>
}

ReactDOM.render(<Index />, document.getElementById('app'))