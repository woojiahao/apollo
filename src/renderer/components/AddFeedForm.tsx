import React, { createRef, useState } from "react";
import { useNavigate } from "react-router";
import { TagFeeds } from "../../main/database/mappers/FeedMapper";
import { RSS } from "../../main/rss/data";
import { addFeed as ipcAddFeed, getFeed } from "../ipcInvoker";
import Autocomplete from "./Form/Autocomplete";
import Button from "./Form/Button";
import Form from "./Form/Form";
import FormButtons from "./Form/FormButtons";
import FormFields from "./Form/FormFields";
import FormSection from "./Form/FormSection";
import TextField from "./Form/TextField";

interface AddFeedFormProps {
  layout: string
  tagFeeds: TagFeeds
  onDataUpdate: () => void
}

const AddFeedForm = ({ layout, tagFeeds, onDataUpdate }: AddFeedFormProps) => {
  const [isFinalStep, setIsFinalStep] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feed, setFeed] = useState<RSS.Feed>(undefined)
  const [feedTitle, setFeedTitle] = useState('')
  const [feedUrl, setFeedUrl] = useState('')
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

  async function addFeed(title: string, tag: string) {
    // TODO: Add toast message on success
    setIsLoading(true)
    try {
      const updatedFeedWithName: RSS.Feed = Object.assign({}, feed)
      updatedFeedWithName.title = title
      await ipcAddFeed(updatedFeedWithName, feedUrl, tag)
      setError(undefined)
      onDataUpdate()
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
          <Autocomplete label="feed-tag" title="Feed Tag" ref={feedTagRef} initialData={Object.keys(tagFeeds)} />
        </FormSection>
      </FormFields>

      <FormButtons>
        <Button color="bg-red" text="Cancel" onClick={back.bind(this)} />
        <Button
          color="bg-accent"
          text={isFinalStep ? 'Add' : 'Download'}
          onClick={() => isFinalStep ? addFeed(feedNameRef.current.value, feedTagRef.current.value) : downloadFeed(feedUrlRef.current.value)} />
      </FormButtons>
    </Form>
  )
}

export default AddFeedForm