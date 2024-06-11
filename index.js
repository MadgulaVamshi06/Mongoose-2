const connection = require("./config/db.js");
const express = require("express");

const movieRouter = require("./routes/movie.route.js")
const server = express();
server.use(express.json());
server.use("/movie",movieRouter)

server.get("/", (req, res) => {
  res.send("Welcome to Movie Rating");
});

server.listen(3000, async (req, res) => {
  try {
    await connection;
    console.log("server is running on 3000 port and connected to mongo db");
  } catch (error) {
    console.log("error", error);
  }
});