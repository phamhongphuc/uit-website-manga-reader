import {
    Mutation as genreMutation,
    Query as genreQuery,
} from './resolver/genre';

import ScalarDate from './scalar/date';
import { MangaType, StatusType } from '../database/model/Manga';

export default {
    Query: {
        ...genreQuery,
    },
    Mutation: {
        ...genreMutation,
    },
    Date: ScalarDate,
    MangaType,
    StatusType,
};
