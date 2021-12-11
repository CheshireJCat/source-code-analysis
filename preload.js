const { contextBridge, ipcRenderer } = require("electron")

// 监听加载完成事件
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// 写入web中可以使用的方法
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

//
contextBridge.exposeInMainWorld('ipc', {
  log(text) {
    return ipcRenderer.invoke('log', text)
  }
})
