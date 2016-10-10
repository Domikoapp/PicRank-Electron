const electron = require("electron");
const BWindow = electron.BrowserWindow;
const {dialog} = electron;
import {Picture} from "../entity/picture";
import {PictureDAO} from "../dao/picture-dao";

/**
 * index.htmlのサービスを行う
 */
export class IndexService {
    private view: Electron.BrowserWindow;
    private picDAO: PictureDAO;

    constructor(view: Electron.BrowserWindow) {
        this.view = view;
        this.picDAO = new PictureDAO();
    }

    /**
     * すでに登録してある写真が存在するか調べる
     */
    public getDuplicatePicture(pics: Picture[], callback:(result: Picture[]) => void) {
        this.picDAO.getDuplicatePicture(pics, callback);
    }

    /**
     * 写真を登録する処理
     */
    public registerPics(pics: Picture[]) {
                // データベースに写真を登録する関数（複数箇所で使うためくくりだし）
        var register = function (pics: Picture[]) {
            console.log("register" + pics.length + "pics");
            console.log(pics);
        };

        // 重複する写真に対する処理
        this.getDuplicatePicture(pics, (result:Picture[]) => {
            if (result.length > 0) {
                // 重複が存在すれば、重複を許可するかどうか確認する
                var selected = dialog.showMessageBox(this.view, {
                    type: "question",
                    buttons: ["読み込む", "読み込まない"],
                    defaultId: 0,
                    title: "重複する写真があります",
                    message: "既に登録されている写真と同じ名前の写真があります。\n重複する写真を読み込みますか？"
                });
                console.log(selected);

                // 重複排除（selected=1）の場合は重複する写真をpicsから排除
                if (selected == 1) {
                    for (var i=0; i<result.length; i++) {
                        const rm_target: Picture = result[i];
                        for (var j=pics.length-1; j>=0; j--) {
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
    }
 
    public OnClose() {
        this.picDAO.close();
    }
}