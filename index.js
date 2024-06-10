const connection = require("./config/db.js");
const express = require("express");
const MovieModel = require("./model/movie.model.js");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Movie Rating");
});


server.get("/movies", async (req, res) => {
  try {
    const filter = req.query;
    const movie = await MovieModel.find(filter);
    res.status(200).send(movie);
  } catch (error) {
    console.log("Data not found", error);
  }
});

server.post("/movies", async (req, res) => {
  const { title, rating, releaseDate,genre } = req.body;

  const movie = new MovieModel({
    title, rating, releaseDate,genre 
  });
  await movie.save();
  res.send(movie);
});

server.patch("/updatemovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedMovie = await MovieModel.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send("filed updated");
  } catch (error) {
    console.log("Data not found", error);
  }
});

server.delete("/deletemovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await MovieModel.findByIdAndDelete({ _id: id });
    res.status(200).send("movie deleted");
  } catch (error) {
    console.log("Data not found", error);
  }
});


server.listen(3000, async (req, res) => {
  try {
    await connection;
    console.log("server is running on 3000 port and connected to mongo db");
  } catch (error) {
    console.log("error", error);
  }
});