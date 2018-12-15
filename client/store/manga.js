/* eslint-disable no-unused-vars */
import { MutationTree, ActionTree } from 'vuex';
import apollo from '~/util/apollo';
import gql from 'graphql-tag';

export const state = () => ({
    items: [],
});

/** @type {MutationTree} */
export const mutations = {
    pushItem(state, item) {
        state.items.push(item);
    },
    setItems(state, items) {
        state.items = items;
    },
};

/** @type {ActionTree} **/
export const actions = {
    async fetchItems({ state, commit }) {
        const value = await apollo(this).query({
            query: gql`
                query {
                    mangas {
                        id
                        name
                        description
                        status
                        image {
                            url
                        }
                        genres {
                            name
                        }
                    }
                }
            `,
        });
        commit('setItems', value.data.mangas);
    },

    async fetchItemsWithChapter({ state, commit }) {
        const value = await apollo(this).query({
            query: gql`
                query {
                    mangas {
                        id
                        name
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
        commit('setItems', value.data.mangas);
    },
};
