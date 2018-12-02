/* eslint-disable no-console */
/* eslint-disable no-process-exit */
import Promise from 'bluebird';
import database, { db } from '../database/database';

import { Genre } from '../database/model';
import genreData from './genreData';

(async function() {
    await database();
    db.realm.write(() => {
        db.realm.deleteAll();
    });

    await Promise.map(
        genreData,
        async ({ name, description }) => {
            await Genre.create({ name, description });
            console.log('create', name);
        },
        { concurrency: 3 },
    );

    console.log('done!');
    process.exit(0);
})();
