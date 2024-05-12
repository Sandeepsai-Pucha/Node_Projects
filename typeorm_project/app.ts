import express, { Request, Response } from "express";
// import { AppDataSource } from "./src/datasource";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
// import { UserResolver } from "./resolvers/UserResolver";

const PORT = 4040;

const app = express();

async function main() {
  createConnection({
    type: "mysql",
    port: 3306,
    host: "localhost",
    username: "root",
    password: "Sandeepsai@204",
    database: "mydb",
    synchronize: true,
    entities: ["./entity/*.ts"],
  })
    .then(() => {
      console.log("Connected to Database...");
    })
    .catch((error: any) => {
      console.log("Failed to Connect Database...", error);
    });
  // const schema = await buildSchema()
  const server = new ApolloServer({})
  await server.listen(4040)
  console.log("Server has started!")
}

main()
