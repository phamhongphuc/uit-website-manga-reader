import { Chapter } from '.';
import { db } from '../database';
import { deleteImage, uploadImage } from '../utils/Imgur';
import { Model } from '../utils/Model';
import { isBufferValid, isNameValid } from '../utils/Validation';

class Image extends Model {
    /**
     * @param {import('../interface/image').Input} input
     */
    static isInputValid(input) {
        isNameValid(input.name);
        isBufferValid(input.imageBuffer);
    }

    /**
     * @param {import('../interface/image').Input} input
     */
    static async create(input) {
        Image.isInputValid(input);
        const image = await uploadImage(input.imageBuffer);
        const imageData = {
            id: Image.nextId,
            name: input.name,
            url: image.data.data.link,
            deletehash: image.data.data.deletehash,
        };
        if (input.chapterId !== undefined) {
            Chapter.isIdValid(input.chapterId);
            imageData.chapter = Chapter.getById(input.chapterId);
        }
        const result = await Image.write(imageData);
        return result;
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
