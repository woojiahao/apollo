import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FeedCore, TagFeeds } from "../../main/database/mappers/FeedMapper";
import { getFeed } from "../ipcInvoker";
import Autocomplete from "./Form/Autocomplete";
import Button from "./Form/Button";
import Form from "./Form/Form";
import FormButtons from "./Form/FormButtons";
import FormFields from "./Form/FormFields";
import TextField from "./Form/TextField";

interface EditFeedFormProps {
  tagFeeds: TagFeeds
  onDataUpdate: () => void
}

const EditFeedForm = ({ tagFeeds, onDataUpdate }: EditFeedFormProps) => {
  const [feed, setFeed] = useState<FeedCore>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>(undefined)

  const feedTitleRef = createRef<HTMLInputElement>()
  const feedDescriptionRef = createRef<HTMLInputElement>()
  const feedTagRef = createRef<HTMLInputElement>()

  /// Allow users to edit the feed title, description, and tag, and to delete it
  const { id } = useParams()
  const feedId = parseInt(id)

  async function loadFeed() {
    const f = await getFeed(feedId)
    setFeed(f)
  }

  useEffect(() => {
    loadFeed()
  }, [feedId])

  if (feed !== undefined) {
    return (
      <Form title={`Edit ${feed.title}`} isLoading={isLoading} >
        <FormFields error={error}>
          <TextField label="feed-title" title="Feed Title" ref={feedTitleRef} value={feed.title} />
          <TextField label="feed-description" title="Feed Description" ref={feedDescriptionRef} value={feed.description} />
          <Autocomplete label="feed-tag" title="Feed Tag" ref={feedTagRef} initialData={Object.keys(tagFeeds)} initialSelection={feed.tag} />
        </FormFields>

        <FormButtons>
          <Button color="bg-red" text="Cancel" />
          <Button color="bg-red" text="Delete Feed" />
          <Button color="bg-accent" text="Save Changes" />
        </FormButtons>
      </Form>
    )
  }

  return <div></div>
}

export default EditFeedForm