/* eslint-disable no-unused-vars */
import { MutationTree, ActionTree } from 'vuex';
import axios from '~/plugins/axios';

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
        const items = (await axios.get('api/dev/mangas')).data;
        commit('setItems', items);
    },
};
