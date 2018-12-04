/* eslint-disable no-console */
/* eslint-disable no-process-exit */
import Promise from 'bluebird';
import database, { db } from '../database/database';

import { Genre, Manga } from '../database/model';
import genreData from './data/genreData';
import mangaData from './data/mangaData';
import { MangaType, StatusType } from '../database/model/Manga';

(async function() {
    await database();
    db.realm.write(() => {
        db.realm.deleteAll();
    });

    await Promise.map(
        genreData,
        async data => {
            await Genre.create(data);
            console.log('create', data.name);
        },
        { concurrency: 10 },
    );

    await Promise.map(
        mangaData,
        async data => {
            data.type = MangaType[data.type];
            data.status = StatusType[data.status];
            await Manga.create(data);
            console.log('create', data.name);
        },
        { concurrency: 10 },
    );

    console.log('Done!');
    process.exit(0);
})();
