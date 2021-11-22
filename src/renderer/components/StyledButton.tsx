import React from "react";

interface StyledButtonProps {
  text: string
  color: 'bg-red' | 'bg-accent'
  onClick?: () => void
}

export default class StyledButton extends React.Component<StyledButtonProps> {
  render() {
    const classes = [
      this.props.color,
      'py-2',
      'px-6',
      'rounded-md'
    ].join(' ')
    return (
      <button type="button" onClick={this.props.onClick} className={classes}>
        <span className="font-bold text-background">{this.props.text}</span>
      </button>
    )
  }
}