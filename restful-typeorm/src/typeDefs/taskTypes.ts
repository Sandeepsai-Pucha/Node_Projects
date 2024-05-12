import { gql } from "apollo-server-express";

const taskDefs = gql`
  type Task {
    id: Int!
    title: String!
    description: String!
    created: String
    updated: String
    is_completed: Boolean
    user_id: Int
    user: User
  }

  extend type Query {
    getAllTasks: [Task]
    getTask(id: Int!): Task!
  }

  extend type Mutation {
    createTask(input: TaskInput!): Task!
    updateTask(input: UpdateInput!): UpdateTask!
    deleteTask(id: Int!): TaskStatus!
  }

  input UpdateInput {
    is_completed: Boolean!
    id: Int!
  }
  type UpdateTask {
    is_completed: Boolean!
    message: String!
    id: Int!
    task: Task!
  }
  type TaskStatus {
    message: String!
    task:Task!
  }

  input TaskInput {
    title: String
    description: String
    user_id: Int!
  }
`;

export default taskDefs;
