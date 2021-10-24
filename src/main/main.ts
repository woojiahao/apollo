const electron = require('electron')
const { app, BrowserWindow } = electron

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.maximize()
  mainWindow.webContents.openDevTools()
})

app.on('window-all-closed', () => {
  // TODO: Elegant closing
  app.quit()
})