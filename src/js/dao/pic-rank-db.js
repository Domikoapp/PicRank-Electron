"use strict";
var sqlite = require("sqlite3");
var fs = require("fs");
/**
 * データベースマネージャ
 */
var PicRankDB = (function () {
    /**
     * データベース初期化処理
     */
    function PicRankDB(dbpath) {
        this.db = new sqlite.Database(dbpath);
        if (!fs.existsSync(dbpath)) {
        }
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
exports.PicRankDB = PicRankDB;
//# sourceMappingURL=pic-rank-db.js.map