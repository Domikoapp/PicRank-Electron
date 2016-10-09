const sqlite = require("sqlite3");
import {PictureDAO} from "./picture-dao";

/**
 * DBに関する全ての処理を担うDBマネージャ
 * 各DAOに処理をリクエストし、結果を返す
 */
export class PicRankDBManager {
    /** データベースへのコネクション */
    protected db;

    /** 写真テーブルの操作クラス */
    private picDAO: PictureDAO;

    constructor(dbpath:string) {
        console.log("this is db manager");
        this.db = new sqlite.Database(dbpath);
        this.picDAO = new PictureDAO(this.db);
    }

    /**
     * データベースアクセスを閉じる
     */
    public close() {
        if (this.db != null) {
            this.db.close();
        }
    }
}