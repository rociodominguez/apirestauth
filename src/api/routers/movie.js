const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getMovies, postMovie, deleteMovie, updateMovie } = require("../controllers/movie");

const movieRoutes = require("express").Router();

movieRoutes.put("/:id", [isAuth], [isAdmin], updateMovie);
movieRoutes.delete("/:id", [isAuth], [isAdmin], deleteMovie);
movieRoutes.post("/", [isAuth], postMovie);
movieRoutes.get("/", getMovies);

module.exports = movieRoutes;