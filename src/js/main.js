var electron = require("electron");
var application = electron.app;
var BWindow = electron.BrowserWindow;
var fs = require("fs");
var path = require("path");
var sqlite = require("sqlite3");
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
        this.db = new PicRankDB(dbpath);
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
    PicRank.prototype.OnClose = function () {
        this.db.close();
    };
    return PicRank;
}());
/**
 * データベースマネージャ
 */
var PicRankDB = (function () {
    /**
     * データベース初期化処理
     */
    function PicRankDB(dbpath) {
        console.log("file:/" + dbpath);
        this.db = new sqlite.Database(dbpath);
        if (!fs.existsSync(dbpath)) {
            this.db.run("create table test (id interger, data string);");
        }
        console.log("File exists : " + fs.existsSync(dbpath));
    }
    /**
     * データベースクローズ処理
     */
    PicRankDB.prototype.close = function () {
        if (this.db != null) {
            this.db.close();
        }
    };
    return PicRankDB;
}());
/**
 * アプリケーションエントリーポイント
 */
var dbpath = "./db/test.db";
var picrank = new PicRank(application, dbpath);
//# sourceMappingURL=main.js.map