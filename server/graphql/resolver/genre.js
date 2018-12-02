import { Genre } from '../../database/model';

export const Query = {
    genres() {
        return Genre.list;
    },

    genre(_, { name }) {
        return Genre.getByName(name);
    },
};

export const Mutation = {
    async addGenre(_, { input }) {
        const { name, description } = input;
        const genre = await Genre.create({ name, description });
        return genre;
    },

    async updateGenre(_, { input }) {
        const { name, description } = input;
        const oldGenre = Genre.getByName(name);
        if (oldGenre === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        const genre = await oldGenre.update({ name, description });
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
