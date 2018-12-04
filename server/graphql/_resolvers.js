import Genre from './resolver/genre';
import Manga from './resolver/manga';
import Image from './resolver/image';

import util from './util/_util';

const queryAndMutation = [Genre, Manga, Image].reduce(
    (output, currentValue) => {
        output.Query = { ...output.Query, ...currentValue.Query };
        output.Mutation = { ...output.Mutation, ...currentValue.Mutation };
        return output;
    },
    { Query: {}, Mutation: {} },
);

export default {
    ...queryAndMutation,
    ...util,
};
