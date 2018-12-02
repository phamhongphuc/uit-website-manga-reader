import { db } from '../database';
import { Model } from '../utils/Model';
import { isDescriptionValid, isNameValid } from '../utils/Validation';

/**
 * @typedef {import('../interface/genre').IGenreInput} IGenreInput
 * @typedef {import('../interface/genre').IGenreOutput} IGenreOutput
 */
class Genre extends Model {
    /**
     * @param {String} name
     * @returns {Genre}
     */
    static getByName(name) {
        return this.list.filtered('name == $0', name)[0];
    }

    /**
     * @param {IGenreInput} input
     */
    static isInputValid(input) {
        isNameValid(input.name);
        isDescriptionValid(input.description);
    }

    /**
     * @param {IGenreInput} input
     * @return {Genre}
     */
    static create(input) {
        Genre.isInputValid(input);
        if (Genre.getByName(input.name) !== undefined) {
            throw new Error('Thể loại này đã được tạo');
        }
        return Genre.write({
            name: input.name,
            description: input.description,
        });
    }

    /**
     * @param {IGenreInput} input
     * @return {Promise<Genre>}
     */
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

    /**
     * @return {Promise<void>}
     */
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
