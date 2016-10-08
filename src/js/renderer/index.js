//ファイルドラッグ処理
document.getElementById("ddtarget").ondrop = function (e) {
    e.preventDefault();
    var files = e.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
        console.log("File : " + files[i].path);
        var img = document.createElement("img");
        img.src = files[i].path;
        img.className = "thumbnail";
        console.log(img.className);
        document.body.appendChild(img);
    }
};
//# sourceMappingURL=index.js.map