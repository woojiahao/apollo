import React from "react";
import ReactDOM from "react-dom";
import "./app.global.css";
import NavigationBar from "./components/NavigationBar";

export default class Index extends React.Component {
  render() {
    return (
      <div className="flex">
        <div className="flex-1">
          <NavigationBar />
        </div>
        <div className="container py-6">
          <h1>Open-source Deep Dive</h1>
          <p>Open-source Deep Dive</p>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <h4>Header 4</h4>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis adipisci, nobis modi, sed ex nesciunt molestiae veniam quo dolores qui sint perferendis mollitia rem commodi odit dolorum quia! Dolor, deserunt?
          </p>
          <p className="font-normal text-tiny">Subtitle</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))