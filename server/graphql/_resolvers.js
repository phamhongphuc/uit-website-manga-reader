import {
    Mutation as genreMutation,
    Query as genreQuery,
} from './resolver/genre';

export default {
    Query: {
        ...genreQuery,
    },

    Mutation: {
        ...genreMutation,
    },
};
