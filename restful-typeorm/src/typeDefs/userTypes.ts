import { gql } from "apollo-server-express";

const userDefs = gql`
  type User {
    id: Int!
    first_name: String!
    last_name: String
    age: Int
    created_at: String
    updated_at: String
    tasks: [Task]
  }

  extend type Query {
    getAllUsers(search: String): [User]
    getUser(id: Int!): User!
  }

  extend type Mutation {
    createUser(input: UserInput!): User!
    deleteUser(id: Int!): User!
  }

  input UserInput {
    first_name: String
    last_name: String
    age: Int
  }
`;

export default userDefs;