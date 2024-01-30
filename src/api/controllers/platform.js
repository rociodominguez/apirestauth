const Platform = require("../models/platform");

const postPlatform = async (req, res, next) => {
    try {
        const newPlatform = new Platform(req.body);
        const platformSaved = await newPlatform.save();
        return res.status(200).json(platformSaved);
    } catch (error) {
        return res.status(400).json("Error en POST");
    }
};

const getPlatforms = async (req, res, next) => {
    try {
        const allPlatforms = await Platform.find().populate("movies");
        return res.status(200).json(allPlatforms);
    } catch (error) {
        return res.status(400).json("Error en GET");
    }
};


const updatePlatform = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldPlatform = await Platform.findById(id);
        const newPlatform = new Platform(req.body);
        newPlatform._id = id;
        newPlatform.movies = [...oldPlatform.movies, ...req.body.movies]
        const updatedPlatform = await Platform.findByIdAndUpdate(id, newPlatform, {
            new: true,
        });
        return res.status(200).json(updatedPlatform);
    } catch (error) {
        return res.status(400).json("Error en PUT");
    }
};

const deletePlatform = async (req, res, next) => {
    try {
        const { id } = req.params;
        const platformDeleted = await Platform.findByIdAndDelete(id);
        return res.status(200).json(platformDeleted);
    } catch (error) {
        return res.status(400).json("Error en DELETE");
    }
};

module.exports = { getPlatforms, postPlatform, updatePlatform, deletePlatform };