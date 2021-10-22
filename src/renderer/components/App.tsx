import React, { Children } from "react"
import './App.css'

export const App = (props) => {
  return <div id="app">{props.children}</div>
}