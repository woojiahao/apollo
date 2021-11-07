# apollo
RSS made easy

## Lessons learnt

- For shared state, do not use the props as the state of the component
- ~~Use `@electron/remote` to share the db connection from the main process to the renderer process~~
- Use ipcRenderer and ipcMain to invoke functions in the main process (which has access to the database)

## Refresh feed algorithm

To determine if an article is newly added to the feed, we employ the follow algorithm:

1. Retrieve existing feed with articles from database
2. Fetch the latest version of the feed
3. For each feed,
   1. Compare the existing list of articles against the latest list of articles*
   2. If an article is completely new, add it to the list of existing articles
   3. If an article exists but has been updated, update it in the list of existing articles
4. Commit any changes made to the database

```
* - Given that an article must include either a title or description, we will use those as a measure of "new".
    If the article from the latest pulled feed has a completely different title/description, then that is a new article
    If the article from the latest pulled feed has the same title/description, but differing content/link, we will 
      update that instead.

    To make it easier to compare the contents, we will encode the content to Base-64
```

## TODO

- [ ] Cache articles