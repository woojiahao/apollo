import React, { ReactElement } from "react";

type WrapIconProps = {
  icon: ReactElement
  content: string
  onClick?: () => void
}

export default class WrapIcon extends React.Component<WrapIconProps> {
  constructor(props: WrapIconProps) {
    super(props)
  }

  render() {
    return (
      <div className="flex items-center" onClick={this.props.onClick}>
        {this.props.icon} <span className="ml-3 font-bold">{this.props.content}</span>
      </div >
    )
  }
}