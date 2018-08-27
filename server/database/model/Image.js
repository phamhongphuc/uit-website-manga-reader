import { isNameValid, isUrlValid } from '../utils/Validation';
import { Model } from '../utils/Model';
import { db, Chapter } from '../../database/database';

class Image extends Model {
    /**
     * @param {import('../interface/image').Input} input
     */
    static isRawValid(input) {
        isNameValid(input.name);
        isUrlValid(input.url);
        Chapter.isIdValid(input.chapterId);
    }

    /**
     * @param {import('../interface/image').Input} input
     */
    static async create(input) {
        Image.isRawValid(input);
        return await Image.write({
            id: Image.nextId,
            name: input.name,
            url: input.url,
            chapter: Chapter.getById(input.chapterId),
        });
    }

    delete() {
        return new Promise(resolve => {
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
        manga: {
            type: 'linkingObjects',
            objectType: 'Manga',
            property: 'image',
        },
    },
};

export default Image;
