import React from "react"

interface HomeProps {
  layout: string
}

const Home = ({ layout }: HomeProps) => {
  /// TODO: Add recent feeds for ease of use
  const classes = [
    layout,
    'flex',
    'flex-col',
    'justify-center',
    'items-center'
  ].join(' ')

  return (
    <div className={classes}>
      <h1>No Feeds Selected!</h1>
      <p className="text-subtitle">Select a feed from the navigation bar to begin browsing!</p>
    </div>
  )
}

export default Home