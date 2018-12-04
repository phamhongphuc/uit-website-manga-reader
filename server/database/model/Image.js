import { Chapter } from '.';
import { db } from '../database';
import { deleteImage, uploadImage } from '../utils/imgur';
import { Model } from '../utils/model';
import { isUploadInputValid } from '../utils/validation';

class Image extends Model {
    /**
     * @param {import('../interface/image').IImageInput} input
     */
    static async create(input) {
        isUploadInputValid(input.file);

        const imageFromImgur = await uploadImage(input.file);
        const imageData = {
            id: Image.nextId,
            name: 'input.name',
            url: imageFromImgur.data.data.link,
            deletehash: imageFromImgur.data.data.deletehash,
        };

        if (input.chapterId !== undefined) {
            Chapter.isIdValid(input.chapterId);
            imageData.chapter = Chapter.getById(input.chapterId);
        }

        /** @type {Image} */
        const image = await Image.write(imageData);
        return image;
    }

    delete() {
        return new Promise(async resolve => {
            await deleteImage(this.deletehash);
            db.realm.write(() => {
                db.realm.delete(this);
                resolve();
            });
        });
    }
}

Image.schema = {
    name: 'Image',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        url: 'string',
        deletehash: 'string',
        chapter: 'Chapter',
        manga: {
            type: 'linkingObjects',
            objectType: 'Manga',
            property: 'image',
        },
    },
};

export default Image;
