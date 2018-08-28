import { isNameValid, isBufferValid } from '../utils/Validation';
import { Model } from '../utils/Model';
import { db, Chapter } from '../../database/database';
import { uploadImage, deleteImage } from '../utils/Imgur';

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
        return await Image.write(imageData);
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
        chapter: 'Chapter',
        deletehash: 'string',
        manga: {
            type: 'linkingObjects',
            objectType: 'Manga',
            property: 'image',
        },
    },
};

export default Image;
