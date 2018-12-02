import { ApolloServer } from 'apollo-server-koa';
import fs from 'fs';
import path from 'path';
import resolvers from './_resolvers';

const schemaPath = path.resolve(__dirname, './schema.gql');
const typeDefs = fs.readFileSync(schemaPath).toString();

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
