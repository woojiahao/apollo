import React, { PropsWithChildren } from "react"

/**
 * Any kind of list of information like the today/bookmarks feed
 * TODO: Figure out how to sync the interface and class types
 */
interface FeedProps {
  data: any
}

const Feed = ({ data, children }: PropsWithChildren<FeedProps>) => {
  if (data !== undefined) {
    return (
      <div className="grid grid-cols-4 h-full py-6">
        {children}
      </div>
    )
  }
  return <div></div>
}


export default Feed