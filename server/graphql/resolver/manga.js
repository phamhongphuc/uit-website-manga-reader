import { Manga } from '../../database/model';

/**
 * @typedef {import('../../database/interface/manga').IMangaInput} IMangaInput
 */

const Query = {
    mangas() {
        return Manga.list;
    },

    /** @type {import('graphql-tools').IFieldResolver<any, any, {id: Number}>} */
    manga(_, { id }) {
        return Manga.getById(id);
    },
};

const Mutation = {
    /** @type {import('graphql-tools').IFieldResolver<any, any, {input: IMangaInput}>} */
    async addManga(_, { input }) {
        const manga = await Manga.create(input);
        return manga;
    },

    /** @type {import('graphql-tools').IFieldResolver<any, any, {input: IMangaInput}>} */
    async updateManga(_, { input }) {
        /** @type {Manga} **/
        const oldManga = Manga.getById(name);
        if (oldManga === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        const manga = await oldManga.update(input);
        return manga;
    },

    /** @type {import('graphql-tools').IFieldResolver<any, any, {id: Number}>} */
    async deleteManga(_, { id }) {
        const manga = Manga.getById(id);
        if (Manga === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        await manga.delete();
        return true;
    },
};

export default {
    Query,
    Mutation,
};
