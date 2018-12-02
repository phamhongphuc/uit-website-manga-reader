import { Manga } from '../../database/model';

export const Query = {
    mangas() {
        return Manga.list;
    },

    manga(_, { id }) {
        return Manga.getById(id);
    },
};

export const Mutation = {
    async addManga(_, { input }) {
        const manga = await Manga.create(input);
        return manga;
    },

    async updateManga(_, { input }) {
        /** @type {Manga} **/
        const oldManga = Manga.getById(name);
        if (oldManga === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        const manga = await oldManga.update(input);
        return manga;
    },

    async deleteManga(_, { name }) {
        const manga = Manga.getByName(name);
        if (Manga === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        await manga.delete();
        return true;
    },
};
