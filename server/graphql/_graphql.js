import { ApolloServer, gql } from 'apollo-server-koa';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

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
