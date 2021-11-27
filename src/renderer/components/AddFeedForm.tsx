import React, { createRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router";
import { RSS } from "../../main/rss/data";
import { getFeed, addFeed as ipcAddFeed } from "../ipcInvoker";
import StyledButton from "./form/StyledButton";
import StyledTextField from "./form/StyledTextField";
import WrapIcon from "./WrapIcon";

interface AddFeedFormProps {
  layout: string
}

const AddFeedForm = ({ layout }: AddFeedFormProps) => {
  const [isFinalStep, setIsFinalStep] = useState(false)
  const [feed, setFeed] = useState<RSS.Feed>(undefined)
  const [feedTitle, setFeedTitle] = useState('')
  const [feedUrl, setFeedUrl] = useState('')
  const [feedTag, setFeedTag] = useState('Uncategorized')

  const navigate = useNavigate()

  const classes = [
    layout,
    'container',
    'py-6'
  ].join(' ')

  const feedUrlRef = createRef<HTMLInputElement>()
  const feedNameRef = createRef<HTMLInputElement>()
  const feedTagRef = createRef<HTMLInputElement>()

  function back() {
    navigate(-1)
  }

  // TODO: Add loader
  async function downloadFeed(url: string) {
    const feed = await getFeed(url)
    setFeed(feed)
    setFeedTitle(feed.title)
    setFeedUrl(url)
    setIsFinalStep(true)
  }

  async function addFeed(title: string) {
    const updatedFeedWithName: RSS.Feed = Object.assign({}, feed)
    updatedFeedWithName.title = title
    await ipcAddFeed(updatedFeedWithName, feedUrl, feedTag)
  }

  return (
    <div className={classes}>
      <WrapIcon icon={<MdArrowBack />} content="Back" onClick={back.bind(this)} />

      <h1>Add Feed</h1>

      <div className="mb-4">
        <StyledTextField label="feed-url" title="Feed URL" ref={feedUrlRef} disabled={isFinalStep} />

        <div style={{ display: isFinalStep ? 'block' : 'none' }}>
          <h2>Configure Feed</h2>
          <StyledTextField label="feed-name" title="Feed Name" ref={feedNameRef} value={feedTitle} />
          <StyledTextField label="feed-tag" title="Feed Tag" ref={feedTagRef} />
        </div>
      </div>

      <div className="flex">
        <StyledButton color="bg-red" text="Cancel" />
        <StyledButton
          color="bg-accent"
          text={isFinalStep ? 'Add' : 'Download'}
          onClick={() => isFinalStep ? addFeed(feedNameRef.current.value) : downloadFeed(feedUrlRef.current.value)} />
      </div>
    </div >
  )
}

export default AddFeedForm