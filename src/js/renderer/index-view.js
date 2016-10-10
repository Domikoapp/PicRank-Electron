"use strict";
//ファイルドラッグ処理
var filecopy = require("filecopy");
var ipcRenderer = require("electron").ipcRenderer;
var picture_1 = require("../js/entity/picture");
document.getElementById("ddtarget").ondrop = function (e) {
    e.preventDefault();
    var files = e.dataTransfer.files;
    // 画像情報をDBに登録し、画像保存領域に画像をコピー保存
    //    var isFirst: boolean = true;
    //    var msg = "";
    var pics = [];
    for (var i = 0; i < files.length; i++) {
        var regex = /^image.+/g;
        var file = files[i];
        if (!regex.test(file.type)) {
            continue;
        }
        var pic = new picture_1.Picture(file.path, file.name);
        pics.push(pic);
    }
    // DB登録
    ipcRenderer.send("register-pics-req", JSON.stringify(pics), undefined);
    // ファイルコピー
    /*filecopy(file.path, "db/pictures/" + file.name, {
            mkdirp: true
    });*/
};
ipcRenderer.on("register-pics-resp", function (event, arg) {
    console.log("async : " + arg);
});
//# sourceMappingURL=index-view.js.map