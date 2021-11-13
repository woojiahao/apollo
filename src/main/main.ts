import { app, BrowserWindow, Menu, MenuItemConstructorOptions, Tray } from 'electron'
import path from 'path'
import 'reflect-metadata'
import { setupDatabase } from './database/database'
import registerHandlers from './ipcHandler'

require('dotenv').config()

/// This runs for every new instance of the application
/// Setup the backend for database and event handlers
setupDatabase()
registerHandlers()

const iconPath = path.join(__dirname, 'icon.png')
const indexPath = path.join(__dirname, 'index.html')

let window: BrowserWindow = null
let systemTray: Tray = null

/// Requesting for the lock for a single instance of the application
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  /// If another instance of the application is already open, we can just close this instance
  app.quit()
} else {
  /// If this instance somehow has the lock to the single instance, we want it to open the existing instance
  app.on('second-instance', () => {
    if (window) {
      if (window.isMinimized()) window.restore()
      window.focus()
    }
  })

  app.whenReady().then(() => {
    initializeWindow()
    initializeSystemTray()
  })
}

function initializeWindow() {
  console.log(__dirname)
  window = new BrowserWindow({
    minWidth: 1200,
    minHeight: 800,
    autoHideMenuBar: true,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  window.on('close', e => {
    console.log('closing window')
    e.preventDefault()
    window.hide()
  })

  window.loadFile(indexPath)
  window.maximize()
}

function initializeSystemTray() {
  systemTray = new Tray(iconPath)

  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Apollo',
      icon: iconPath,
      enabled: false
    }, {
      type: 'separator'
    }, {
      label: 'Show Apollo',
      click: function () {
        window.show()
      }
    }, {
      label: 'Quit',
      click: function () {
        window.close()
        app.exit()
      }
    }
  ]
  const contextMenu = Menu.buildFromTemplate(template)

  systemTray.on('double-click', () => {
    window.show()
  })

  systemTray.setToolTip('Apollo')
  systemTray.setContextMenu(contextMenu)
}