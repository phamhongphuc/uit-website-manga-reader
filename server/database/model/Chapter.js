import Promise from 'bluebird';
import { db, Manga } from '../../database/database';
import { Model } from '../utils/Model';
import { isNameValid } from '../utils/Validation';

class Chapter extends Model {
    /**
     * @param {import('../interface/chapter').Input} input
     */
    static async create(input) {
        Manga.isIdValid(input.mangaId);
        return await Chapter.write({
            id: Chapter.nextId,
            name: '',
            date: new Date(),
            manga: Manga.getById(input.mangaId),
            isPublished: false,
        });
    }

    update(input) {
        return new Promise(resolve => {
            db.realm.write(() => {
                if (input.hasOwnProperty('name')) {
                    isNameValid(input.name);
                    this.name = input.name;
                }
                this.isPublished = true;
                resolve(this);
            });
        });
    }

    delete() {
        return new Promise(async resolve => {
            await Promise.map(this.images, async image => await image.delete(), {
                concurrency: 3,
            });
            db.realm.write(() => resolve(db.realm.delete(this)));
        });
    }
}

Chapter.schema = {
    name: 'Chapter',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        date: 'date',
        manga: 'Manga',
        isPublished: 'bool',
        images: {
            type: 'linkingObjects',
            objectType: 'Image',
            property: 'chapter',
        },
    },
};

export default Chapter;
