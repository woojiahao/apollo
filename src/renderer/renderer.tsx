import React from "react";
import ReactDOM from "react-dom";
import "./app.global.css";
import NavigationBar from "./components/NavigationBar";
import StyledButton from "./components/StyledButton";
import StyledTextField from "./components/StyledTextField";

export default class Index extends React.Component {
  render() {
    const tagFeeds = {
      'Programming': [
        { feedId: 1, feedTitle: 'A Programmer\'s Perspective' },
        { feedId: 2, feedTitle: 'SlashDot' },
        { feedId: 3, feedTitle: 'Bob\'s Feed' },
      ],
      'Uncategorized': [
        { feedId: 4, feedTitle: 'John Green' }
      ]
    }

    return (
      <div className="flex">
        <NavigationBar tagFeeds={tagFeeds} />
        <div className="container py-6">
          <StyledButton text="Cancel" color="bg-red" />
          <StyledButton text="Add" color="bg-accent" />
          <StyledTextField title="Feed URL" label="feedurl" />

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