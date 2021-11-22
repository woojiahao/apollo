import React, { ReactElement } from "react";

interface TreeItemProps {
  icon?: ReactElement
  key?: string | number
  onClick?: () => void
}

export default class TreeItem extends React.Component<TreeItemProps> {
  constructor(props: TreeItemProps) {
    super(props)
  }

  render() {
    return (
      <li key={this.props.key} onClick={this.props.onClick}>
        {this.props.children}
      </li>
    )
  }
}