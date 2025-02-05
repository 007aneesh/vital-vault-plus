/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendData: (data) => console.log('Data sent:', data),
})
