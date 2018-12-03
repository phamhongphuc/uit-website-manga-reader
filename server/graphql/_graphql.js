import { ApolloServer } from 'apollo-server-koa';
import fs from 'fs';
import path from 'path';
import resolvers from './_resolvers';

const importGraphql = filePath => {
    const schemaPath = path.resolve(__dirname, filePath);
    return fs.readFileSync(schemaPath).toString();
};

const typeDefs = [
    importGraphql('./schema/schema.gql'),
    importGraphql('./schema/custom.gql'),
    importGraphql('./schema/model/chapter.gql'),
    importGraphql('./schema/model/genre.gql'),
    importGraphql('./schema/model/image.gql'),
    importGraphql('./schema/model/manga.gql'),
];

/**
 * @typedef {import("koa")} Koa
 * @param {Koa} app
 */
export default function(app) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        uploads: true,
    });
    server.applyMiddleware({ app, path: '/api/graphql' });

    // eslint-disable-next-line no-console
    console.log(`Graphql Path: ${server.graphqlPath}`);
}
