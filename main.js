const electron = require('electron');
const ipcMain = electron.ipcMain;
const {app} = electron;
const {BrowserWindow} = electron;
const storage = require('electron-json-storage');
let win;

function createWindow() {
  win = new BrowserWindow({width: 1000, height: 700, frame: true});
  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });
};

ipcMain.on('save-store', (event, arg) => {
  storage.set('redux-store', arg, function(error) {
    if(error) throw error;
  });
});

ipcMain.on('retrieve-store', (event, arg) => {
  storage.get('redux-store', function(error, data) {
    event.returnValue = data
  });
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
