import React, { createRef, useState } from "react";
import { useNavigate } from "react-router";
import { RSS } from "../../main/rss/data";
import { addFeed as ipcAddFeed, getFeed } from "../ipcInvoker";
import Button from "./Form/Button";
import Form from "./Form/Form";
import FormButtons from "./Form/FormButtons";
import FormFields from "./Form/FormFields";
import FormSection from "./Form/FormSection";
import TextField from "./Form/TextField";

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

  const feedUrlRef = createRef<HTMLInputElement>()
  const feedNameRef = createRef<HTMLInputElement>()
  const feedTagRef = createRef<HTMLInputElement>()

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

  function back() {
    navigate(-1)
  }

  return (
    <Form title="Add Feed" layout={layout} isLoading={isLoading}>
      <FormFields error={error}>
        <TextField label="feed-url" title="Feed URL" ref={feedUrlRef} disabled={isFinalStep} />

        <FormSection title="Configure Feed" visibility={isFinalStep}>
          <TextField label="feed-name" title="Feed Name" ref={feedNameRef} value={feedTitle} />
          <TextField label="feed-tag" title="Feed Tag" ref={feedTagRef} />
        </FormSection>
      </FormFields>

      <FormButtons>
        <Button color="bg-red" text="Cancel" onClick={back.bind(this)} />
        <Button
          color="bg-accent"
          text={isFinalStep ? 'Add' : 'Download'}
          onClick={() => isFinalStep ? addFeed(feedNameRef.current.value) : downloadFeed(feedUrlRef.current.value)} />
      </FormButtons>
    </Form>
  )
}

export default AddFeedForm