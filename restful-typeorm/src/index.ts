import { ApolloServer } from "apollo-server-express";
import { AppDataSource } from "./data-source";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import TaskResolver from "./resolvers/TaskResolver";
import UserResolver from "./resolvers/UserResolver";
import TypeDefs from "./typeDefs/typeDefs";
// import Resolver from "./resolvers/Resolver";

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to the Database");
  })
  .catch((error) => console.log("Failed to Connect the Database", error));
const main = async () => {
  const apolloServer = new ApolloServer({
      typeDefs: TypeDefs,
      resolvers: [TaskResolver, UserResolver],
  });
  await apolloServer.start();
  const app: Express = express();
  apolloServer.applyMiddleware({ app });
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server is Running on ${port}`));
}
main().catch((error) => console.log("Got error", error))