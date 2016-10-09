"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pic_rank_dao_1 = require("./pic-rank-dao");
/**
 * 写真テーブルへの処理を行うDAO
 */
var PictureDAO = (function (_super) {
    __extends(PictureDAO, _super);
    function PictureDAO(db) {
        console.log("this is PictureDAO");
        _super.call(this, db);
    }
    return PictureDAO;
}(pic_rank_dao_1.PicRankDAO));
exports.PictureDAO = PictureDAO;
//# sourceMappingURL=picture-dao.js.map