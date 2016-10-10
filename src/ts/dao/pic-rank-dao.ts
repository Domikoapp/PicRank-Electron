const sqlite = require("sqlite3");
const fs = require("fs");

/**
 * すべてのDAOのベースとなるDAO
 * 全DAOに共通する処理はここに書く
 */
export class PicRankDAO {
    /** データベースコネクション */
    protected db;
    private dbpath = "./db/picrank.db";

    /**
     * データベース初期化処理
     */
    constructor() {
        this.db = new sqlite.Database(this.dbpath);
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