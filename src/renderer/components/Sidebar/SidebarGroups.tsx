import React, { PropsWithChildren } from "react"

const SidebarGroups = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className="hidden-scroll">
      {children}
    </div>
  )
}

export default SidebarGroups