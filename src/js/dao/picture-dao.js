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
    function PictureDAO() {
        _super.call(this);
    }
    /**
     * 重複する写真が存在するか調べる
     */
    PictureDAO.prototype.getDuplicatePicture = function (pics, callback) {
        var _this = this;
        var promises = [];
        var duplicatPics = [];
        var _loop_1 = function() {
            console.dir(pics[i]);
            var pic = pics[i];
            promises.push(new Promise(function (resolve, reject) {
                _this.db.get("select count(pic_id) as count from pictures where pic_name = ?;", pic.name, function (err, res) {
                    if (res.count > 0) {
                        duplicatPics.push(pic);
                    }
                    resolve();
                });
            }));
        };
        for (var i = 0; i < pics.length; i++) {
            _loop_1();
        }
        Promise.all(promises).then(function () {
            callback(duplicatPics);
        });
    };
    /**
     * 写真を登録する
     */
    PictureDAO.prototype.registerPicture = function () {
    };
    return PictureDAO;
}(pic_rank_dao_1.PicRankDAO));
exports.PictureDAO = PictureDAO;
//# sourceMappingURL=picture-dao.js.map