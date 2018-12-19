/* eslint-disable no-unused-vars */
import { MutationTree, ActionTree, GetterTree } from 'vuex';
import Vue from 'vue';
import apollo from '~/util/apollo';
import gql from 'graphql-tag';
import { pushMutation, setListMutation } from '~/store/_helper';

export const state = () => ({
    mangas: [],
});

/** @type {GetterTree} */
export const getters = {
    getManga: state => mangaId => {
        return state.mangas.find(manga => manga.id === mangaId);
    },
};

/** @type {MutationTree} */
export const mutations = {
    ...pushMutation('manga'),
    ...setListMutation('manga'),
};

/** @type {ActionTree} **/
export const actions = {
    async fetchMangas({ commit }) {
        const result = await apollo(this).query({
            query: gql`
                query {
                    mangas {
                        id
                        name
                        description
                        status
                        genres {
                            name
                        }
                        image {
                            url
                        }
                        chapters {
                            id
                            name
                        }
                    }
                }
            `,
        });
        commit('setMangas', result.data.mangas);
        commit(
            'chapter/pushChaptersFromManga',
            { mangas: result.data.mangas },
            { root: true },
        );
    },

    async fetchManga({ commit }, { mangaId }) {
        const result = await apollo(this).query({
            query: gql`
                query($id: Int) {
                    manga(id: $id) {
                        id
                        name
                        description
                        image {
                            url
                        }
                        genres {
                            name
                        }
                        chapters {
                            id
                            name
                            date
                            isPublished
                            images {
                                id
                                name
                                url
                            }
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only',
            variables: {
                id: mangaId,
            },
        });
        commit('pushManga', result.data.manga);
        commit(
            'chapter/pushChaptersFromManga',
            { mangas: [result.data.manga] },
            { root: true },
        );
    },
};
