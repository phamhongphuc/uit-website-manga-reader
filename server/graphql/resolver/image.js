import { Image } from '../../database/model';

/**
 * @typedef {import('../../database/interface/image').IImageInput} IImageInput
 */

const Query = {
    // Empty
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
