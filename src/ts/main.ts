const electron = require("electron");
const application = electron.app;
const BWindow = electron.BrowserWindow;
const fs = require("fs");
const path = require("path");
const sqlite = require("sqlite3");

declare var __dirname, process;

/**
 * PicRankアプリケーションメインプロセス制御クラス
 */
class PicRank {
    private app: Electron.App;
    private mainWindow: Electron.BrowserWindow = null;
    private db: PicRankDB;

    constructor(app: Electron.App, dbpath: string){
        // アプリケーションイベント
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('ready', this.onReady);
        this.app.on('close', this.OnClose);

        // DB初期化
        this.db = new PicRankDB(dbpath);
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
            acceptFirstMouse: true,
            titleBarStyle: 'hidden'
        });

        this.mainWindow.loadURL('file://' + __dirname + '/../index.html');

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });
        this.mainWindow.webContents.openDevTools();
    }

    OnClose(){
        this.db.close();
    }
}

/**
 * データベースマネージャ
 */
class PicRankDB {
    private db;

    /**
     * データベース初期化処理
     */
    constructor(dbpath) {
        console.log("file:/" + dbpath);
        this.db = new sqlite.Database(dbpath);
        if(!fs.existsSync(dbpath)) {
            this.db.run("create table test (id interger, data string);");
        }
        console.log("File exists : " + fs.existsSync(dbpath));
    }

    /**
     * データベースクローズ処理
     */
    public close() {
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
