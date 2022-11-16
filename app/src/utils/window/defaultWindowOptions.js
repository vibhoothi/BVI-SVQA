exports.defaultWindowOptions = {
  width: 1920,
  height: 1080,
  frame: false,
  resizable: false,
  maximizable: false,
  transparent: true,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    devTools: true,
    contextIsolation: false,
    enableRemoteModule: true,
  },
};
