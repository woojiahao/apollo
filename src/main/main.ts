import { app, BrowserWindow } from 'electron'
import 'reflect-metadata'
import { setupDatabase } from './database/database'
import setupHandlers from './ipcHandlers/handlers'

require('dotenv').config()

setupDatabase()
setupHandlers()

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
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

