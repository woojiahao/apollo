# apollo
RSS made easy

## Lessons learnt

- For shared state, do not use the props as the state of the component
- ~~Use `@electron/remote` to share the db connection from the main process to the renderer process~~
- Use ipcRenderer and ipcMain to invoke functions in the main process (which has access to the database)

## TODO

- [ ] Cache articles