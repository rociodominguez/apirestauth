require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const movieRoutes = require("./src/api/routers/movie");
const platformRoutes = require("./src/api/routers/platform");
const usersRoutes = require("./src/api/routers/user");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/platforms", platformRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", usersRoutes);

app.use("*", (req, res, next) => {
    return res.status(400).json("Route not found");
})

app.listen(8080, () => {
    console.log("Servidor en http://localhost:8080 ✅");
})