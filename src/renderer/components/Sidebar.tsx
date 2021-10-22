import React from "react";
import { AiOutlineCheck } from 'react-icons/ai';
import { GrAdd, GrRefresh } from 'react-icons/gr';
import './Sidebar.css';

export default class Sidebar extends React.Component {
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