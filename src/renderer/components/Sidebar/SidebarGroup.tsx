import React, { ReactElement } from "react"
import WrapIcon from "../WrapIcon"

interface SidebarGroupProps {
  icon: ReactElement
  title: string
  data: any[]
  render: (data: any) => ReactElement
}

const SidebarGroup = ({ icon, title, data, render }: SidebarGroupProps) => {
  return (
    <div className={`flex flex-col gap-2 ${data.length === 0 ? 'hidden' : 'block'}`}>
      <WrapIcon icon={icon} content={title} />
      <ul>
        {data.map(render)}
      </ul>
    </div>
  )
}

export default SidebarGroup