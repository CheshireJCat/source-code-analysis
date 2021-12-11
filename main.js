const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const { initListenWeb } = require("./node/listenWeb")

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })
    initListenWeb();
    // 入口html
    // win.loadFile('web/index.html')
    win.loadURL('https://www.baidu.com')
}


app.whenReady().then(() => {
    // 启动
    createWindow()


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})