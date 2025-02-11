const typeDefs = `#graphql
    type User {
        id: ID!,
        first_name: String!,
        last_name: String,
        email: String,
    }
    type Query {
        users: [User],
        user(id: ID!): User
    }
`;

export default typeDefs;
