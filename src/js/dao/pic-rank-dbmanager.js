"use strict";
var sqlite = require("sqlite3");
var picture_dao_1 = require("./picture-dao");
/**
 * DBに関する全ての処理を担うDBマネージャ
 * 各DAOに処理をリクエストし、結果を返す
 */
var PicRankDBManager = (function () {
    function PicRankDBManager(dbpath) {
        console.log("this is db manager");
        this.db = new sqlite.Database(dbpath);
        this.picDAO = new picture_dao_1.PictureDAO(this.db);
    }
    /**
     * データベースアクセスを閉じる
     */
    PicRankDBManager.prototype.close = function () {
        if (this.db != null) {
            this.db.close();
        }
    };
    return PicRankDBManager;
}());
exports.PicRankDBManager = PicRankDBManager;
//# sourceMappingURL=pic-rank-dbmanager.js.map