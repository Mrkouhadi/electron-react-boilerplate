const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('path')
const isDev = !app.isPackaged;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:false,
      worldSafeExecuteJavascript:true,
      contextIsolation:true,
      preload:path.join(__dirname, 'preload.js'),
    }
  })
  mainWindow.loadFile('index.html')
}
if(isDev){
  // compiling code when changing it
  require('electron-reload')(__dirname, {
    electron:path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('notify', (_, message)=>{
  new Notification({title:'Notification', body:message}).show()
})