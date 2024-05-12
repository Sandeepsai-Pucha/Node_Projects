import { gql } from "apollo-server-express";
import taskDefs from "./taskTypes";
import userDefs from "./userTypes";

const TypeDefs = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

export default [
    TypeDefs,
    taskDefs,
    userDefs
]