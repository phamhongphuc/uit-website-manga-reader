import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './shema.gql';
import resolvers from './_resolvers';

/**
 * @typedef {import("koa")} Koa
 * @param {Koa} app
 */
export default function(app) {
    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app, path: '/api/graphql' });

    // eslint-disable-next-line no-console
    console.log(`Graphql Path: ${server.graphqlPath}`);
}
