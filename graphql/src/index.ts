import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express, { Express } from "express";
import { TaskResolver } from "./resolvers/taskResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm/browser";
import { AppDataSource } from "./datasource";

const main = async () => {
  await createConnection({
    type: "mysql",
    port: 3306,
    host: "localhost",
    username: "root",
    password: "Sandeepsai@204",
    database: "mydb",
    synchronize: true,
    entities: ["./entitity/*.ts"],
  })
    .then(() => {
      console.log("Connected to Database...");
    })
    .catch((error: any) => {
      console.log("Failed to Connect Database...", error);
    });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();
  const app: Express = express();
  apolloServer.applyMiddleware({ app });
  const port = process.env.PORT || 4080;
  app.get("/", (req, res) => res.send("Hello World!"));
  app.listen(port, () => console.log(`Server is Running on ${port}`));
};

main().catch((error: any) => console.log(error));
// //data
// const users = [
//   {
//     id: 1,
//     first_name: "Sandeep",
//     last_name: "Pucha",
//     email: "sandeep@gmail.com",
//   },
//   {
//     id: 2,
//     first_name: "Manish",
//     last_name: "Naini",
//     email: "manish@gmail.com",
//   },
//   {
//     id: 3,
//     first_name: "Swaroop",
//     last_name: "Jyothi",
//     email: "swaroop@gmail.com",
//   },
//   {
//     id: 4,
//     first_name: "Harish",
//     last_name: "Salla",
//     email: "harish@gmail.com",
//   },
//   {
//     id: 5,
//     first_name: "Kapil",
//     last_name: "Ch",
//     email: "kapil@gmail.com",
//   },
// ];

// // types
// // const typeDefs = `#graphql
// //     type User {
// //         id: ID!,
// //         first_name: String!,
// //         last_name: String,
// //         email: String,
// //     }
// //     type Query {
// //         users: [User]
// //         user(id: ID!): User
// //     }
// // `;

// // resolvers
// const resolvers = {
//   Query: {
//     users() {
//         return users
//     },
//     user(_: any, args: any) {
//         return users.find((user) => user.id === args.id)
//     }
//   },
// };

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// })

// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4040}
// })

// console.log(`Server is ready at port: ${url}`)
