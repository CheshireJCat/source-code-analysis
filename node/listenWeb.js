const { ipcMain } = require("electron");

function init() {
    ipcMain.handle("log", (event, text) => {
        console.log(text)
        return "log success"
    })
}

module.exports = {
    initListenWeb: init
}
