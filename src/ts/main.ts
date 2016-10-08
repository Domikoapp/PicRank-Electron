// Nodeモジュール読み込み
const electron = require("electron");
const application = electron.app;
const BWindow = electron.BrowserWindow;

//自作モジュール読み込み
const picrankDB = require('./dao/pic-rank-db.js');

declare var __dirname, process;

/**
 * PicRankアプリケーションメインプロセス制御クラス
 */
class PicRank {
    private app: Electron.App;
    private mainWindow: Electron.BrowserWindow = null;
    private db;

    constructor(app: Electron.App, dbpath: string){
        // アプリケーションイベント
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('ready', this.onReady);
        this.app.on('close', this.OnClose);

        // DB初期化
        this.db = new picrankDB.PicRankDB(dbpath);
    }

    onWindowAllClosed(){
        if(process.platform != 'darwin'){
            this.app.quit();
        }
    }

    onReady(){
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

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });
        this.mainWindow.webContents.openDevTools();
    }

    OnClose(){
        if (this.db != null) {
            this.db.close();
        }
    }
}

/**
 * アプリケーションエントリーポイント
 */
const dbpath = "./db/test.db";
const picrank = new PicRank(application, dbpath);
