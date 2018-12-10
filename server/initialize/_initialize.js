/* eslint-disable no-console */
/* eslint-disable no-process-exit */
import initializeDatabase from './initializeDatabase';
import database from '../database/database';

(async function() {
    await database();
    await initializeDatabase();
    console.log('Done!');
    process.exit(0);
})();
