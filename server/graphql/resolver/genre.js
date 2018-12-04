import { Genre } from '../../database/model';

const Query = {
    genres() {
        return Genre.list;
    },

    genre(_, { name }) {
        return Genre.getByName(name);
    },
};

const Mutation = {
    async addGenre(_, { input }) {
        const genre = await Genre.create(input);
        return genre;
    },

    async updateGenre(_, { input }) {
        const oldGenre = Genre.getByName(name);
        if (oldGenre === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        const genre = await oldGenre.update(input);
        return genre;
    },

    async deleteGenre(_, { name }) {
        const genre = Genre.getByName(name);
        if (genre === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        await genre.delete();
        return true;
    },
};

export default {
    Query,
    Mutation,
};
