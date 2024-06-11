const express = require("express");
const MovieModel = require("../model/movie.model");

const movieRouter = express.Router();

  movieRouter.get("/getmovies", async (req, res) => {
    try {
      const filter = req.query;
      const movie = await MovieModel.find(filter);
      res.status(200).send(movie);
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  
  movieRouter.post("/getmovies", async (req, res) => {
    const { title, rating, releaseDate,genre } = req.body;
  
    const movie = new MovieModel({
      title, rating, releaseDate,genre 
    });
    await movie.save();
    res.send(movie);
  });
  
  movieRouter.patch("/updatemovie/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedMovie = await MovieModel.findByIdAndUpdate({ _id: id }, data);
      res.status(200).send("filed updated");
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  
  movieRouter.delete("/deletemovie/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMovie = await MovieModel.findByIdAndDelete({ _id: id });
      res.status(200).send("movie deleted");
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  

  module.exports = movieRouter;