/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { Store } from 'vuex';
import ApolloClient from 'apollo-client';

/**
 * @param {Store} store
 * @return {ApolloClient}
 */
export default function(store) {
    return store.app.apolloProvider.defaultClient;
}
