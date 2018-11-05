import fs from 'fs';
import Realm from 'realm';

import { Chapter, Genre, Manga, Image } from './model';

let instance = null;

export const db = {
    get realm() {
        if (!(instance instanceof Realm)) {
            throw 'Đối tượng realm được gọi khi chưa được khởi tạo';
        }
        return instance;
    },
};

export default async () => {
    if (instance) return;
    if (!fs.existsSync('database')) fs.mkdirSync('database');
    instance = await Realm.open({
        path: 'database/realm.realm',
        schema: [Chapter, Genre, Image, Manga],
        deleteRealmIfMigrationNeeded: true,
    });
};
