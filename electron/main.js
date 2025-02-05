/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  const devURL = 'http://localhost:3000/admin-login' // Next.js dev server
  //   const prodURL = `file://${path.join(__dirname, '../out/index.html')}` // Static build

  mainWindow.loadURL(devURL)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
