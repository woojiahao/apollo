import React from "react";

interface StyledTextFieldProps {
  title: string
  label: string
}

export default class StyledTextField extends React.Component<StyledTextFieldProps> {
  render() {
    return (
      <div className="flex flex-col">
        <label className="block mb-2 text-subtitle font-bold" htmlFor={this.props.label}>{this.props.title}</label>
        <input type="text" id={this.props.label} name={this.props.label} className="py-2 px-4 rounded-md border-2 border-icon" />
      </div>
    )
  }
}