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

export const MangaType = {
    MANGA: 0,
    MANHWA: 1,
    MANHUA: 2,
    COMIC: 3,
};

export const StatusType = {
    ISGOING: 0,
    COMPLETED: 1,
    DROP: 2,
};

class Manga extends Model {
    /**
     * @param {import('../interface/manga').Input} input
     */
    static isInputValid(input) {
        isNameValid(input.name);
        isAssociatedNamesValid(input.associatedNames);
        isMangaTypeValid(input.type);
        isStatusTypeValid(input.status);
        isDateValid(input.publishedFrom);
        isDateValid(input.publishedTo);
        isGenreNamesValid(input.genreNames);
        isAuthorsValid(input.authors);
        isDescriptionValid(input.description);
        Image.isIdValid(input.imageId);
    }

    /**
     * @param {import('../interface/manga').Input} input
     */
    static create(input) {
        Manga.isInputValid(input);
        return Manga.write({
            id: Manga.nextId,
            name: input.name,
            associatedNames: input.associatedNames,
            type: input.type,
            status: input.status,
            publishedFrom: moment(input.publishedFrom, 'DD-MM-YYYY').toDate(),
            publishedTo: moment(input.publishedTo, 'DD-MM-YYYY').toDate(),
            genres: input.genreNames.map(genreName => Genre.getByName(genreName)),
            authors: input.authors,
            description: input.description,
            image: Image.getById(input.imageId),
        });
    }

    /**
     * @param {import('../interface/manga').Input} input
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
                    const publishedFrom = moment(input.publishedFrom, 'DD-MM-YYYY').toDate();
                    isDateValid(publishedFrom);
                    this.publishedFrom = publishedFrom;
                }
                if (input.hasOwnProperty('publishedTo')) {
                    const publishedTo = moment(input.publishedTo, 'DD-MM-YYYY').toDate();
                    isDateValid(publishedTo);
                    this.publishedTo = publishedTo;
                }
                if (input.hasOwnProperty('genres')) {
                    isGenreNamesValid(input.genreNames);
                    this.genres = input.genreNames.map(genreName => Genre.getByName(genreName));
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
                    Image.isIdValid(input.imageId);
                    this.image = Image.getById(input.imageId);
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
