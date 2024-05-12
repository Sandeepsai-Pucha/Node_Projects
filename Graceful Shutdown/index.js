require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3300;

mongoose.connect(mongoString);

mongoose.connection.on("error", (error) => {
  console.log(error);
});

mongoose.connection.once("connected", () => {
  console.log("Database Connected...");
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose Disconnected from DB...");
});

app.get("/", async (request, response) => {
  console.time();
  console.log("Request Recieved...");
  await longRuntask();
  await longRuntaskTwo(),
  response.json({ message: "Hello From Express Server..." });
  console.log("Response Sent...");
  console.timeEnd();
});

function longRuntask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Long running task completed.");
    }, 5000);
  });
}

function longRuntaskTwo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Long running task completed.");
      }, 10000);
    });
  }

const server = app.listen(PORT, (request, response) => {
  console.log(
    `Server is listening on port ${PORT} On Process ID: ${process.pid}`
  );
});

process.on("SIGINT", () => {
  console.info("SIGINT signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    // boolean means [force], see in mongoose doc
    mongoose.connection.on('close', () => {
      console.log("MongoDb connection closed.");
    });
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    server.close(() => {
      console.log("Http server closed.");
      // boolean means [force], see in mongoose doc
      mongoose.connection.on('close', () => {
        console.log("MongoDb connection closed.");
        process.exit(0);
    });
    });
  });
