import React from "react";
import { AiOutlineCheck } from 'react-icons/ai';
import { GrAdd, GrRefresh } from 'react-icons/gr';
import './Navigation.css';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <div>
          <AiOutlineCheck />
          <GrRefresh />
          <GrAdd />
        </div>
      </nav>
    )
  }
}