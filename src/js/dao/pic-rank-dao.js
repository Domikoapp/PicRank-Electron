"use strict";
var sqlite = require("sqlite3");
var fs = require("fs");
/**
 * すべてのDAOのベースとなるDAO
 * 全DAOに共通する処理はここに書く
 */
var PicRankDAO = (function () {
    /**
     * データベース初期化処理
     */
    function PicRankDAO(db) {
        this.db = db;
        console.log("this is base DAO");
    }
    /**
     * データベースクローズ処理
     */
    PicRankDAO.prototype.close = function () {
        if (this.db != null) {
            this.db.close();
        }
    };
    return PicRankDAO;
}());
exports.PicRankDAO = PicRankDAO;
//# sourceMappingURL=pic-rank-dao.js.map