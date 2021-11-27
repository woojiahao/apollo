import React, { ReactElement } from "react";
import { MdOutlineChevronRight, MdOutlineExpandMore } from "react-icons/md";
import WrapIcon from "../WrapIcon";

interface TreeViewProps {
  title: string
  children: React.ReactElement<HTMLLIElement> | React.ReactElement<HTMLLIElement>[]

  key?: string
  expandIcon?: ReactElement
  collapseIcon?: ReactElement
  onContextMenu?: (e: React.MouseEvent) => void
}

interface TreeViewState {
  isExpanded: boolean
  isSelected: boolean
}

export default class TreeView extends React.Component<TreeViewProps, TreeViewState> {
  constructor(props: TreeViewProps) {
    super(props)
    this.state = {
      isExpanded: false,
      isSelected: false
    }
  }

  expand() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const expandIcon = this.props.expandIcon ? this.props.expandIcon : <MdOutlineExpandMore />
    const collapseIcon = this.props.collapseIcon ? this.props.collapseIcon : <MdOutlineChevronRight />

    return (
      <ul
        className="list-none block -mx-6 cursor-pointer select-none">
        <div className="block hover:bg-hover px-6 ">
          {/* TODO: Add animation when chevron points down */}
          <WrapIcon
            icon={this.state.isExpanded ? expandIcon : collapseIcon}
            content={this.props.title}
            onContextMenu={this.props.onContextMenu}
            onClick={this.expand.bind(this)} />
        </div>
        {/* TODO: Move the classes to the tree item and let it handle the on clicks */}
        <div style={{ display: this.state.isExpanded ? 'block' : 'none' }}>
          {this.props.children}
        </div>
      </ul>
    )
  }
}