import React, { createRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router";
import { RSS } from "../../main/rss/data";
import { addFeed as ipcAddFeed, getFeed } from "../ipcInvoker";
import ErrorMessage from "./form/ErrorMessage";
import StyledButton from "./form/StyledButton";
import StyledTextField from "./form/StyledTextField";
import Loader from "./Loader";
import WrapIcon from "./WrapIcon";

interface AddFeedFormProps {
  layout: string
}

const AddFeedForm = ({ layout }: AddFeedFormProps) => {
  const [isFinalStep, setIsFinalStep] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feed, setFeed] = useState<RSS.Feed>(undefined)
  const [feedTitle, setFeedTitle] = useState('')
  const [feedUrl, setFeedUrl] = useState('')
  const [feedTag, setFeedTag] = useState('Uncategorized')
  const [error, setError] = useState<string>(undefined)

  const navigate = useNavigate()

  const classes = [
    layout,
    'container',
    'flex',
    'flex-col',
    'gap-4',
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
    setIsLoading(true)
    try {
      const feed = await getFeed(url)
      setFeed(feed)
      setFeedTitle(feed.title)
      setFeedUrl(url)
      setIsFinalStep(true)
      setError(undefined)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function addFeed(title: string) {
    // TODO: Add toast message on success
    setIsLoading(true)
    try {
      const updatedFeedWithName: RSS.Feed = Object.assign({}, feed)
      updatedFeedWithName.title = title
      await ipcAddFeed(updatedFeedWithName, feedUrl, feedTag)
      setError(undefined)
      back()
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={classes}>
      <WrapIcon icon={<MdArrowBack />} content="Back" onClick={back.bind(this)} />

      <h1>Add Feed</h1>

      <div className={`absolute gap-6 top-0 bottom-0 left-0 right-0 bg-icon bg-opacity-50 ${isLoading ? 'block' : 'hidden'}`}>
        <div className="h-screen flex-col flex items-center justify-center">
          <h1>Loading...</h1>
          <Loader />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        <ErrorMessage visibility={error !== undefined} message={error} />

        <StyledTextField label="feed-url" title="Feed URL" ref={feedUrlRef} disabled={isFinalStep} />

        <div className={`flex-col gap-4 ${isFinalStep ? 'flex' : 'hidden'}`}>
          <h2>Configure Feed</h2>
          <StyledTextField label="feed-name" title="Feed Name" ref={feedNameRef} value={feedTitle} />
          <StyledTextField label="feed-tag" title="Feed Tag" ref={feedTagRef} />
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <StyledButton color="bg-red" text="Cancel" onClick={back.bind(this)} />
        <StyledButton
          color="bg-accent"
          text={isFinalStep ? 'Add' : 'Download'}
          onClick={() => isFinalStep ? addFeed(feedNameRef.current.value) : downloadFeed(feedUrlRef.current.value)} />
      </div>
    </div >
  )
}

export default AddFeedForm