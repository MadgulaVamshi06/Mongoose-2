const mongoose = require("mongoose");

const movieSchema = new  mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;

