//ファイルドラッグ処理
const filecopy = require("filecopy");
var {ipcRenderer} = require("electron");
import {Picture} from "../js/entity/picture";

document.getElementById("ddtarget").ondrop = function(e) {
    e.preventDefault();
    let files:FileList = e.dataTransfer.files;
    // 画像情報をDBに登録し、画像保存領域に画像をコピー保存
//    var isFirst: boolean = true;
//    var msg = "";
    var pics = [];
    for (var i=0; i<files.length; i++) {
        const regex = /^image.+/g;
        const file:File = files[i];
        if (!regex.test(file.type)) {
            continue;
        }
        const pic = new Picture(file.path, file.name);
        pics.push(pic);
    }

    // DB登録
    ipcRenderer.send("register-pics-req", JSON.stringify(pics), undefined);

    // ファイルコピー
    /*filecopy(file.path, "db/pictures/" + file.name, {
            mkdirp: true
    });*/
};

ipcRenderer.on("register-pics-resp", (event, arg) => {
    console.log("async : " + arg);
});

