const sqlite = require("sqlite3");
const fs = require("fs");

/**
 * データベースマネージャ
 */
export class PicRankDB {
    private db;

    /**
     * データベース初期化処理
     */
    constructor(dbpath) {
        this.db = new sqlite.Database(dbpath);
        if(!fs.existsSync(dbpath)) {
            //this.db.run("create table test (id interger, data string);");
        }
    }

    public 

    /**
     * データベースクローズ処理
     */
    public close() {
        if (this.db != null) {
            this.db.close();
        }
    }
}
