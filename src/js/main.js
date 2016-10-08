// Nodeモジュール読み込み
var electron = require("electron");
var application = electron.app;
var BWindow = electron.BrowserWindow;
//自作モジュール読み込み
var picrankDB = require('./dao/pic-rank-db.js');
/**
 * PicRankアプリケーションメインプロセス制御クラス
 */
var PicRank = (function () {
    function PicRank(app, dbpath) {
        this.mainWindow = null;
        // アプリケーションイベント
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('ready', this.onReady);
        this.app.on('close', this.OnClose);
        // DB初期化
        this.db = new picrankDB.PicRankDB(dbpath);
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
            resizable: true,
            frame: true,
            movable: true,
            acceptFirstMouse: true,
            titleBarStyle: 'default'
        });
        this.mainWindow.loadURL('file://' + __dirname + '/../html/index.html');
        this.mainWindow.on('closed', function () {
            _this.mainWindow = null;
        });
        this.mainWindow.webContents.openDevTools();
    };
    PicRank.prototype.OnClose = function () {
        if (this.db != null) {
            this.db.close();
        }
    };
    return PicRank;
}());
/**
 * アプリケーションエントリーポイント
 */
var dbpath = "./db/test.db";
var picrank = new PicRank(application, dbpath);
//# sourceMappingURL=main.js.map