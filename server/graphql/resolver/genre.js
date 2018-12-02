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
};
