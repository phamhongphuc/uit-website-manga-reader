import Realm from 'realm';
import Chapter from './model/Chapter';
import Genre from './model/Genre';
import Image from './model/Image';
import Manga from './model/Manga';

export { Chapter, Genre, Image, Manga };

let instance = null;

export default async () => {
    if (instance) return;
    instance = await Realm.open({
        path: 'database/realm.realm',
        schema: [Chapter, Genre, Image, Manga],
        deleteRealmIfMigrationNeeded: true,
    });
};

export const db = {
    get realm() {
        if (!(instance instanceof Realm)) {
            throw 'Đối tượng realm được gọi khi chưa được khởi tạo';
        }
        return instance;
    },
};
