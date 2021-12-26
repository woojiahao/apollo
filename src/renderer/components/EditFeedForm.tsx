import React, { createRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FeedInformation, TagFeeds } from "../../main/database/mappers/FeedMapper";
import { editFeed } from "../ipcInvoker";
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
  const [feed, setFeed] = useState<FeedInformation>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>(undefined)

  const navigate = useNavigate()

  const feedTitleRef = createRef<HTMLInputElement>()
  const feedDescriptionRef = createRef<HTMLInputElement>()
  const feedTagRef = createRef<HTMLInputElement>()

  /// Allow users to edit the feed title, description, and tag, and to delete it
  const { id } = useParams()
  const feedId = parseInt(id)

  async function loadFeed() {
    const f = Object
      .values(tagFeeds)
      .reduce((cur, acc) => acc.concat(cur), [])
      .find(f => f.id == feedId)
    setFeed(f)
  }

  async function saveChanges(id: number, title: string, description: string, tag: string | undefined) {
    await editFeed(id, title, description, tag)
    onDataUpdate()
    navigate(-1)
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
          <Button
            color="bg-accent"
            text="Save Changes"
            onClick={() => saveChanges(feedId, feedTitleRef.current.value, feedDescriptionRef.current.value, feedTagRef.current.value)} />
        </FormButtons>
      </Form>
    )
  }

  return <div></div>
}

export default EditFeedForm