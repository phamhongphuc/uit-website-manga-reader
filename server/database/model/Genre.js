import { db } from '../../database/database';
import { Model } from '../utils/Model';
import { isDescriptionValid, isNameValid } from '../utils/Validation';

class Genre extends Model {
    /**
     * @param {String} name
     * @returns {Genre}
     */
    static getByName(name) {
        return this.list.filtered('name == $0', name)[0];
    }

    /**
     * @param {import('../interface/genre').Input} input
     */
    static isInputValid(input) {
        isNameValid(input.name);
        isDescriptionValid(input.description);
    }

    /**
     * @param {import('../interface/genre').Input} input
     */
    static async create(input) {
        Genre.isInputValid(input);
        if (Genre.getByName(input.name) !== undefined) {
            throw 'Thể loại này đã được tạo';
        }
        return await Genre.write({
            name: input.name,
            description: input.description,
        });
    }

    //vì name là khóa chính nên không thể sửa
    update(input) {
        return new Promise(resolve => {
            db.realm.write(() => {
                if (input.hasOwnProperty('description')) {
                    isDescriptionValid(input.description);
                    this.description = input.description;
                    resolve(this);
                }
            });
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

Genre.schema = {
    name: 'Genre',
    primaryKey: 'name',

    properties: {
        name: 'string',
        description: 'string',
        mangas: {
            type: 'linkingObjects',
            objectType: 'Manga',
            property: 'genres',
        },
    },
};

export default Genre;
