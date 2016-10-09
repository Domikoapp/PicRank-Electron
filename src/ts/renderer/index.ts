//ファイルドラッグ処理
const filecopy = require("filecopy");

document.getElementById("ddtarget").ondrop = function(e) {
    e.preventDefault();
    let files:FileList = e.dataTransfer.files;
    // 画像情報をDBに登録し、画像保存領域に画像をコピー保存
    const regex = /^image.+/g;
    for (var i=0; i<files.length; i++) {
        let file:File = files[i];        
        if (!regex.test(file.type)) {
            continue;
        }

        // DB登録


        // ファイルコピー
        filecopy(file.path, "db/pictures/" + file.name, {
             mkdirp: true
        });
    }
};