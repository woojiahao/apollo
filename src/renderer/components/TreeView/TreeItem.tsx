import React, { ReactElement } from "react";

interface TreeItemProps {
  icon?: ReactElement
  id?: string | number
  onClick?: () => void
}

export default class TreeItem extends React.Component<TreeItemProps> {
  constructor(props: TreeItemProps) {
    super(props)
  }

  render() {
    return (
      <li
        className="px-16 hover:bg-hover block"
        key={this.props.id}
        onClick={this.props.onClick}>
        {this.props.children}
      </li>
    )
  }
}