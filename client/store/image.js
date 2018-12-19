/* eslint-disable no-unused-vars */
import { ActionTree } from 'vuex';
import apollo from '~/util/apollo';
import gql from 'graphql-tag';
import {
    deleteMutation,
    pushMutation,
    pushMutationFunction,
} from '~/store/_helper';

export const state = () => ({
    images: [],
});

/** @type {GetterTree} */
export const getters = {
    getImages: state => chapterId => {
        return state.images.filter(image => image.chapter.id === chapterId);
    },
};

/** @type {MutationTree} */
export const mutations = {
    ...pushMutation('image'),
    ...deleteMutation('image'),

    pushImagesFromChapter(state, { chapters }) {
        chapters.forEach(chapter => {
            chapter.images.forEach(image => {
                if (image.chapter === undefined) image.chapter = {};
                image.chapter.id = chapter.id;
                pushMutationFunction('image' + 's', state, image);
            });
        });
    },
};

/** @type {ActionTree} **/
export const actions = {
    async deleteImage({ commit }, { imageId }) {
        const result = await apollo(this).mutate({
            mutation: gql`
                mutation($id: Int!) {
                    deleteImage(id: $id)
                }
            `,
            variables: {
                id: imageId,
            },
        });
        if (result.data.deleteImage !== true) return;

        commit('deleteImage', { imageId });
    },

    /**
     * @param {import('vuex').ActionContext} context
     * @param {File} file
     */
    async uploadImage({ state, commit }, { file, chapterId }) {
        const result = await apollo(this).mutate({
            mutation: gql`
                mutation($input: ImageInput!) {
                    addImage(input: $input) {
                        id
                        name
                        url
                        chapter {
                            id
                        }
                    }
                }
            `,
            variables: {
                input: { file, chapterId },
            },
        });
        commit('pushImage', result.data.addImage);
        return result;
    },
};
