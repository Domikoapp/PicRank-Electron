// Nodeモジュール読み込み
const electron = require("electron");
const application = electron.app;
const BWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

// 自作モジュール読み込み
import {IndexService} from "./service/index-service";
import {Picture} from "./entity/picture";

declare var __dirname, process;


/**
 * PicRankアプリケーションメインプロセス制御クラス
 */
class PicRank {
    private app: Electron.App;
    private indexView: Electron.BrowserWindow = new BWindow({
            width: 800,
            height: 400,
            minWidth: 500,
            minHeight: 200,
            resizable: true,
            frame: true,
            movable: true,
            acceptFirstMouse: true,
            titleBarStyle: 'default'
    });;
    private indexService: IndexService;

    constructor(app: Electron.App){
        // アプリケーションイベント
        this.app = app;
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('close', this.OnClose);
        this.initIndexView();
    }

    /**
     * 写真を登録する
     * @param picsJSON:string - 写真情報のJSON
     */
    public registerPics(pics: Picture[]) {
        console.log(this.indexView);
        console.log(this.indexService);
        this.indexService.registerPics(pics);
    }

    public onWindowAllClosed(){
        if(process.platform != 'darwin'){
            this.app.quit();
        }
    }

    public initIndexView(){
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

        this.indexView.on('closed', () => {
            this.indexView = null;
        });
        this.indexView.webContents.openDevTools();

        this.indexService = new IndexService(this.indexView);
    }

    public OnClose(){
        if (this.indexService != null) {
            this.indexService.OnClose();
        }
    }
}

/**
 * アプリケーションエントリーポイント
 */
var picrank;
application.on("ready", function() {
    picrank = new PicRank(application);
});

/*
 * 写真の登録
 */
ipc.on("register-pics-req", (event, picsJSON: string, allowDuplicated: boolean) => {
    const pics: Picture[] = JSON.parse(picsJSON);
    picrank.registerPics(pics);
});