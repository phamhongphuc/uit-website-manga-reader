/* eslint-disable no-unused-vars */
import { ActionTree } from 'vuex';
import apollo from '~/util/apollo';
import gql from 'graphql-tag';
import Vue from 'vue';
import {
    deleteMutation,
    pushMutation,
    pushMutationFunction,
} from '~/store/_helper';

export const state = () => ({
    chapters: [],
});

/** @type {GetterTree} */
export const getters = {
    getChapter: state => chapterId => {
        return state.chapters.find(chapter => chapter.id === chapterId);
    },
    getChapters: state => mangaId => {
        return state.chapters.filter(chapter => chapter.manga.id === mangaId);
    },
};

/** @type {MutationTree} */
export const mutations = {
    ...pushMutation('chapter'),
    ...deleteMutation('chapter'),

    pushChaptersFromManga(state, { mangas }) {
        mangas.forEach(manga => {
            manga.chapters.forEach(chapter => {
                if (chapter.manga === undefined) chapter.manga = {};
                chapter.manga.id = manga.id;
                pushMutationFunction('chapters', state, chapter);
            });
        });
    },
};

/** @type {ActionTree} **/
export const actions = {
    async newChapter({ commit }, { mangaId, name }) {
        const result = await apollo(this).mutate({
            mutation: gql`
                mutation($input: ChapterInput!) {
                    addChapter(input: $input) {
                        id
                        name
                        date
                        isPublished
                        images {
                            id
                            name
                            url
                        }
                        manga {
                            id
                        }
                    }
                }
            `,
            variables: {
                input: {
                    name,
                    mangaId,
                },
            },
        });
        commit('pushChapter', result.data.addChapter);
    },

    async deleteChapter({ commit }, { chapterId }) {
        const result = await apollo(this).mutate({
            mutation: gql`
                mutation($id: Int!) {
                    deleteChapter(id: $id)
                }
            `,
            variables: {
                id: chapterId,
            },
        });
        if (result.data.deleteChapter !== true) return;

        commit('deleteChapter', { chapterId });
    },

    async fetchChapter({ commit }, { chapterId }) {
        const result = await apollo(this).query({
            query: gql`
                query($id: Int) {
                    chapter(id: $id) {
                        id
                        name
                        date
                        isPublished
                        images {
                            id
                            name
                            url
                        }
                        manga {
                            id
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only',
            variables: {
                id: chapterId,
            },
        });
        commit('pushChapter', result.data.chapter);
        commit(
            'image/pushImagesFromChapter',
            { chapters: [result.data.chapter] },
            { root: true },
        );
        return result.data.chapter;
    },

    async updateChapter({ commit }, { chapterId, name }) {
        const result = await apollo(this).mutate({
            mutation: gql`
                mutation($input: ChapterUpdateInput!) {
                    updateChapter(input: $input) {
                        id
                        name
                        date
                        isPublished
                        images {
                            id
                            name
                            url
                        }
                        manga {
                            id
                        }
                    }
                }
            `,
            variables: {
                input: {
                    id: chapterId,
                    name: name,
                },
            },
        });
        commit('pushChapter', result.data.updateChapter);
        return result.data.chapter;
    },
};
