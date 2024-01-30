const Movie = require("../models/movie");

const postMovie = async (req, res, next) => {
    try {
        const newMovie = new Movie(req.body);

        if(req.user.rol === "admin") {
            newMovie.verified = true;
        } else {
            newMovie.verified = false;
        }

        const movieSaved = await newMovie.save();
        return res.status(200).json(movieSaved);
    } catch (error) {
        return res.status(400).json("Error en POST");
    }
};

const getMovies = async (req, res, next) => {
    try {
        const allMovies = await Movie.find({ verified: true });
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(400).json("Error en GET");
    }
};


const updateMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newMovie = req.body;
        delete newMovie._id;
        const movieUpdated = await Movie.findByIdAndUpdate(id, newMovie, { new: true });
        return res.status(200).json(movieUpdated);
    } catch (error) {
        return res.status(400).json("Error en PUT");
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movieDeleted = await Movie.findByIdAndDelete(id);
        return res.status(200).json(movieDeleted);
    } catch (error) {
        return res.status(400).json("Error en DELETE");
    }
};

module.exports = { getMovies, postMovie, updateMovie, deleteMovie };