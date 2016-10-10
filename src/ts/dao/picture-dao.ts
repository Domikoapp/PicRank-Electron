import {Picture} from "../entity/picture";
import {PicRankDAO} from "./pic-rank-dao";

/**
 * 写真テーブルへの処理を行うDAO
 */
export class PictureDAO extends PicRankDAO {
    
    constructor() {
        super();
    }

    /**
     * 重複する写真が存在するか調べる
     */
    public getDuplicatePicture(pics: Picture[], callback: (result: Picture[]) => void) {
        var promises = [];
        var duplicatPics: Picture[] = [];
        for (var i=0; i<pics.length; i++) {
            console.dir(pics[i]);
            const pic = pics[i];
            promises.push(new Promise((resolve, reject) => {
                this.db.get("select count(pic_id) as count from pictures where pic_name = ?;", pic.name, (err, res) => {
                    if (res.count > 0) {
                        duplicatPics.push(pic);
                    }
                    resolve();
                });
            }));
        }
        Promise.all(promises).then(() => {
            callback(duplicatPics);
        });
    }

    /**
     * 写真を登録する
     */
    public registerPicture() {

    }
}