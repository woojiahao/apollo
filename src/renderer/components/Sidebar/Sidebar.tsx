import React, { PropsWithChildren } from "react";

const Sidebar = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className="flex flex-col gap-4 h-full hidden-scroll">
      {children}
    </div>
  )
}

export default Sidebar