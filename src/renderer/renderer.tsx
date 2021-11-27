import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./app.global.css";
import App from "./components/App";

export default class Index extends React.Component {
  render() {
    return (
      <HashRouter>
        <App />
      </HashRouter>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))