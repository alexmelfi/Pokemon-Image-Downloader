const { app, BrowserWindow } = require('electron')

// function for rendering and configuring the main window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

// creates the main window when the app has loaded
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// application stops running if all windows have closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
