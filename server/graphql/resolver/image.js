/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Image } from '../../database/model';
import { uploadImage } from '../../database/utils/imgur';

/**
 * @typedef {import('../../database/interface/image').IImageInput} IImageInput
 */

const Query = {
    images() {
        return Image.list;
    },

    /** @type {import('graphql-tools').IFieldResolver<any, any, {id: Number}>} */
    manga(_, { id }) {
        return Image.getById(id);
    },
};

const Mutation = {
    /** @type {import('graphql-tools').IFieldResolver<any, any, {input: IImageInput}>} */
    async addImage(_, { input }) {
        const image = await Image.create(input);
        return image;
    },
};

export default {
    Query,
    Mutation,
};
