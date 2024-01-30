const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number },
    genre: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false}
  },
  {
    timestamps: true,
    collection: "movies"
  }
);

const Movie = mongoose.model("movies", movieSchema, "movies");
module.exports = Movie;