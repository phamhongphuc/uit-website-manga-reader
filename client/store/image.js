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
    async doit({ state, commit }, file) {
        const value = await apollo(this).mutate({
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
    },
};
