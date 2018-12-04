import { Chapter } from '.';
import { db } from '../database';
import { deleteImage, uploadImage } from '../utils/imgur';
import { Model } from '../utils/model';
import {
    isUploadInputValid,
    isThrow,
    isPromiseValid,
} from '../utils/validation';

class Image extends Model {
    /**
     * @param {import('../interface/image').IImageInput} input
     */
    static async create(input) {
        isUploadInputValid(input.file);

        /** @type {import('../interface/image').IImageData} */
        const imageData = {};
        imageData.name = 'unknown';

        if (!isThrow(() => isPromiseValid(input.file))) {
            /** @type {import('../../graphql/interface/interface').FileUpload} */
            const { stream, filename } = await input.file;
            input.file = stream;
            imageData.name = filename;
        }
        const imageFromImgur = await uploadImage(input.file);

        imageData.id = Image.nextId;
        imageData.url = imageFromImgur.data.data.link;
        imageData.deletehash = imageFromImgur.data.data.deletehash;

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
