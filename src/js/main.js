var electron = require("electron");
var application = electron.app;
var BWindow = electron.BrowserWindow;
var PicRank = (function () {
    function PicRank(app) {
        this.app = app;
        this.mainWindow = null;
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('ready', this.onReady);
    }
    PicRank.prototype.onWindowAllClosed = function () {
        if (process.platform != 'darwin') {
            this.app.quit();
        }
    };
    PicRank.prototype.onReady = function () {
        var _this = this;
        this.mainWindow = new BWindow({
            width: 800,
            height: 400,
            minWidth: 500,
            minHeight: 200,
            acceptFirstMouse: true,
            titleBarStyle: 'hidden'
        });
        this.mainWindow.loadURL('file://' + __dirname + '/../index.html');
        this.mainWindow.on('closed', function () {
            _this.mainWindow = null;
        });
        this.mainWindow.webContents.openDevTools();
    };
    return PicRank;
}());
var picrank = new PicRank(application);
//# sourceMappingURL=main.js.map