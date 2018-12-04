import Promise from 'bluebird';
import moment from 'moment';
import { db } from '../database';
import { Image, Genre } from '.';
import { Model } from '../utils/Model';
import {
    isAssociatedNamesValid,
    isAuthorsValid,
    isDateValid,
    isDescriptionValid,
    isGenreNamesValid,
    isMangaTypeValid,
    isNameValid,
    isStatusTypeValid,
} from '../utils/Validation';
import { parseDate } from '../utils/_Date';

export const MangaType = {
    MANGA: 0,
    MANHWA: 1,
    MANHUA: 2,
    COMIC: 3,
};

export const StatusType = {
    ONGOING: 0,
    COMPLETED: 1,
    DROP: 2,
};

/**
 * @typedef {import('../interface/manga').IMangaInput} IMangaInput
 */
class Manga extends Model {
    /**
     * @param {IMangaInput} input
     */
    static isInputValid(input) {
        isNameValid(input.name);
        isAssociatedNamesValid(input.associatedNames);
        isMangaTypeValid(input.type);
        isStatusTypeValid(input.status);
        isDateValid(input.publishedFrom);
        isDateValid(input.publishedTo);
        isGenreNamesValid(input.genres);
        isAuthorsValid(input.authors);
        isDescriptionValid(input.description);
    }

    /**
     * @param {IMangaInput} input
     */
    static async create(input) {
        Manga.isInputValid(input);
        const image = await Image.create(input.image);

        /** @type {Manga} */
        const manga = await Manga.write({
            id: Manga.nextId,
            name: input.name,
            associatedNames: input.associatedNames,
            type: input.type,
            status: input.status,
            authors: input.authors,
            description: input.description,
            publishedFrom: parseDate(input.publishedFrom),
            publishedTo: parseDate(input.publishedTo),
            genres: input.genres.map(genreName => Genre.getByName(genreName)),
            image,
        });
        return manga;
    }

    /**
     * @param {IMangaInput} input
     * @return {Manga}
     */
    update(input) {
        return new Promise(resolve => {
            db.realm.write(() => {
                if (input.hasOwnProperty('name')) {
                    isNameValid(input.name);
                    this.name = input.name;
                }
                if (input.hasOwnProperty('associatedNames')) {
                    isAssociatedNamesValid(input.associatedNames);
                    this.associatedNames = input.associatedNames;
                }
                if (input.hasOwnProperty('type')) {
                    isMangaTypeValid(input.type);
                    this.type = input.type;
                }
                if (input.hasOwnProperty('status')) {
                    isStatusTypeValid(input.status);
                    this.status = input.status;
                }
                if (input.hasOwnProperty('publishedFrom')) {
                    const publishedFrom = moment(
                        input.publishedFrom,
                        'DD-MM-YYYY',
                    ).toDate();
                    isDateValid(publishedFrom);
                    this.publishedFrom = publishedFrom;
                }
                if (input.hasOwnProperty('publishedTo')) {
                    const publishedTo = moment(
                        input.publishedTo,
                        'DD-MM-YYYY',
                    ).toDate();
                    isDateValid(publishedTo);
                    this.publishedTo = publishedTo;
                }
                if (input.hasOwnProperty('genres')) {
                    isGenreNamesValid(input.genres);
                    this.genres = input.genres.map(genreName =>
                        Genre.getByName(genreName),
                    );
                }
                if (input.hasOwnProperty('authors')) {
                    isAuthorsValid(input.authors);
                    this.authors = input.authors;
                }
                if (input.hasOwnProperty('description')) {
                    isDescriptionValid(input.description);
                    this.description = input.description;
                }
                if (input.hasOwnProperty('image')) {
                    Image.isIdValid(input.image);
                    this.image = Image.getById(input.image);
                }
                resolve(this);
            });
        });
    }

    delete() {
        return new Promise(async resolve => {
            await Promise.map(
                this.chapters,
                async chapter => {
                    await chapter.delete();
                },
                { concurrency: 3 },
            );
            db.realm.write(() => {
                db.realm.delete(this);
                resolve();
            });
        });
    }
}

Manga.schema = {
    name: 'Manga',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        associatedNames: 'string[]',
        type: 'int',
        status: 'int',
        publishedFrom: 'date',
        publishedTo: 'date',
        genres: 'Genre[]',
        authors: 'string',
        description: 'string',
        image: 'Image',
        chapters: {
            type: 'linkingObjects',
            objectType: 'Chapter',
            property: 'manga',
        },
    },
};

export default Manga;
