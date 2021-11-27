import React, { PropsWithChildren, ReactElement } from "react";

interface TreeItemProps {
  icon?: ReactElement
  id?: string | number
  onClick?: () => void
}

const TreeItem = ({ icon, id, onClick, children }: PropsWithChildren<TreeItemProps>) => {
  return (
    <li
      className="px-16 hover:bg-hover block"
      key={id}
      onClick={onClick}>
      {children}
    </li>
  )
}

export default TreeItem