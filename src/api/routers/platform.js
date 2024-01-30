const { isAdmin } = require("../../middlewares/auth");
const { getPlatforms, postPlatform, deletePlatform, updatePlatform } = require("../controllers/platform");

const platformRoutes = require("express").Router();

platformRoutes.put("/:id", [isAdmin], updatePlatform);
platformRoutes.delete("/:id", [isAdmin], deletePlatform);
platformRoutes.post("/", [isAdmin], postPlatform);
platformRoutes.get("/", getPlatforms);

module.exports = platformRoutes;