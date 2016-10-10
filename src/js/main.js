"use strict";
// Nodeモジュール読み込み
var electron = require("electron");
var application = electron.app;
var BWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;
// 自作モジュール読み込み
var index_service_1 = require("./service/index-service");
/**
 * PicRankアプリケーションメインプロセス制御クラス
 */
var PicRank = (function () {
    function PicRank(app) {
        this.indexView = new BWindow({
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
        // アプリケーションイベント
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('close', this.OnClose);
        this.initIndexView();
    }
    ;
    /**
     * 写真を登録する
     * @param picsJSON:string - 写真情報のJSON
     */
    PicRank.prototype.registerPics = function (pics) {
        console.log(this.indexView);
        console.log(this.indexService);
        this.indexService.registerPics(pics);
    };
    PicRank.prototype.onWindowAllClosed = function () {
        if (process.platform != 'darwin') {
            this.app.quit();
        }
    };
    PicRank.prototype.initIndexView = function () {
        var _this = this;
        this.indexView = new BWindow({
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
        this.indexView.loadURL('file://' + __dirname + '/../html/index.html');
        this.indexView.on('closed', function () {
            _this.indexView = null;
        });
        this.indexView.webContents.openDevTools();
        this.indexService = new index_service_1.IndexService(this.indexView);
    };
    PicRank.prototype.OnClose = function () {
        if (this.indexService != null) {
            this.indexService.OnClose();
        }
    };
    return PicRank;
}());
/**
 * アプリケーションエントリーポイント
 */
var picrank;
application.on("ready", function () {
    picrank = new PicRank(application);
});
/*
 * 写真の登録
 */
ipc.on("register-pics-req", function (event, picsJSON, allowDuplicated) {
    var pics = JSON.parse(picsJSON);
    picrank.registerPics(pics);
});
//# sourceMappingURL=main.js.map