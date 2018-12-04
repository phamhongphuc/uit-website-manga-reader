/* eslint-disable no-unused-vars */
import { MutationTree, ActionTree } from 'vuex';
import apollo from '~/util/apollo';
import gql from 'graphql-tag';

export const state = () => ({
    items: [],
});

/** @type {ActionTree} **/
export const actions = {
    /**
     * @param {import('vuex').ActionContext} context
     * @param {File} file
     */
    async uploadImage({ state, commit }, file) {
        const result = await apollo(this).mutate({
            mutation: gql`
                mutation($input: ImageInput!) {
                    addImage(input: $input) {
                        name
                        url
                    }
                }
            `,
            variables: {
                input: {
                    name: 'file.name',
                    file,
                },
            },
        });
        return result;
    },
};
