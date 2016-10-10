"use strict";
var electron = require("electron");
var BWindow = electron.BrowserWindow;
var dialog = electron.dialog;
var picture_dao_1 = require("../dao/picture-dao");
/**
 * index.htmlのサービスを行う
 */
var IndexService = (function () {
    function IndexService(view) {
        this.view = view;
        this.picDAO = new picture_dao_1.PictureDAO();
    }
    /**
     * すでに登録してある写真が存在するか調べる
     */
    IndexService.prototype.getDuplicatePicture = function (pics, callback) {
        this.picDAO.getDuplicatePicture(pics, callback);
    };
    /**
     * 写真を登録する処理
     */
    IndexService.prototype.registerPics = function (pics) {
        var _this = this;
        // データベースに写真を登録する関数（複数箇所で使うためくくりだし）
        var register = function (pics) {
            console.log("register" + pics.length + "pics");
            console.log(pics);
        };
        // 重複する写真に対する処理
        this.getDuplicatePicture(pics, function (result) {
            if (result.length > 0) {
                // 重複が存在すれば、重複を許可するかどうか確認する
                var selected = dialog.showMessageBox(_this.view, {
                    type: "question",
                    buttons: ["読み込む", "読み込まない"],
                    defaultId: 0,
                    title: "重複する写真があります",
                    message: "既に登録されている写真と同じ名前の写真があります。\n重複する写真を読み込みますか？"
                });
                console.log(selected);
                // 重複排除（selected=1）の場合は重複する写真をpicsから排除
                if (selected == 1) {
                    for (var i = 0; i < result.length; i++) {
                        var rm_target = result[i];
                        for (var j = pics.length - 1; j >= 0; j--) {
                            if (rm_target.name === pics[j].name) {
                                pics.splice(j, 1);
                                console.log("delete : " + pics[i].name);
                            }
                        }
                    }
                }
            }
            register(pics);
        });
    };
    IndexService.prototype.OnClose = function () {
        this.picDAO.close();
    };
    return IndexService;
}());
exports.IndexService = IndexService;
//# sourceMappingURL=index-service.js.map