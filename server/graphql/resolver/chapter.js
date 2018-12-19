import { Chapter } from '../../database/model';

/**
 * @typedef {import('../../database/interface/chapter').IChapterInput} IChapterInput
 * @typedef {import('../../database/interface/chapter').IChapterUpdateInput} IChapterUpdateInput
 */

const Query = {
    /** @type {import('graphql-tools').IFieldResolver<any, any, {id: number}>} */
    chapter(_, { id }) {
        return Chapter.getById(id);
    },
};

const Mutation = {
    /**
     * @type {import('graphql-tools').IFieldResolver<any, any, {input: IChapterInput}>}
     * @description
     * Tạo ra một chương mới khi ấn vào giao diện đăng truyện.
     * Chương mới này sẽ chưa có tên, mà chỉ truyền vào mangaId
     */
    async addChapter(_, { input }) {
        const chapter = await Chapter.create(input);
        return chapter;
    },

    /**
     * @type {import('graphql-tools').IFieldResolver<any, any, {input: IChapterUpdateInput}>}
     * @description
     * Cập nhật chương cũng là lúc đã tải lên ảnh xong
     * Khi ấn đăng thì chương truyện sẽ được công khai
     */
    async updateChapter(_, { input }) {
        /** @type {Chapter} **/
        const oldChapter = Chapter.getById(input.id);
        if (oldChapter === undefined) {
            throw new Error('Chương này chưa được tạo');
        }
        const chapter = await oldChapter.update(input);
        return chapter;
    },

    /**
     * @type {import('graphql-tools').IFieldResolver<any, any, {id: number}>}
     * @description
     * Xóa chương: hàm này sẽ gọi cái xóa chương và ở phía database
     * cũng đồng thời xóa luôn các hình ảnh trong chương
     */
    async deleteChapter(_, { id }) {
        const chapter = Chapter.getById(id);
        if (chapter === undefined) {
            throw new Error('Chương này chưa được tạo');
        }
        await chapter.delete();
        return true;
    },
};

export default {
    Query,
    Mutation,
};
