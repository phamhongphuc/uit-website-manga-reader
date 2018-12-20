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

    /** @type {import('graphql-tools').IFieldResolver<any, any, {id: number}>} */
    async deleteImage(_, { id }) {
        const image = Image.getById(id);
        if (image === undefined) {
            throw new Error('Thể loại này chưa được tạo');
        }
        await image.delete();
        return true;
    },
};

export default {
    Query,
    Mutation,
};
