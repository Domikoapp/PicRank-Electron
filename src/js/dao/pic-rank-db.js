"use strict";
var sqlite = require("sqlite3");
var fs = require("fs");
/**
 * すべてのDAOのベースとなるDAO
 */
var PicRankDAO = (function () {
    /**
     * データベース初期化処理
     */
    function PicRankDAO(dbpath) {
        this.db = new sqlite.Database(dbpath);
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
//# sourceMappingURL=pic-rank-db.js.map