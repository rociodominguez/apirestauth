const { isAuth, isAdmin } = require("../../middlewares/auth");
const { register, login, deleteUser, getUsers } = require("../controllers/user");

const usersRoutes = require("express").Router();

usersRoutes.get("/", [isAdmin], getUsers)
usersRoutes.post("/register", register)
usersRoutes.post("/login", login);
usersRoutes.delete("/:id", [isAuth], deleteUser)

module.exports = usersRoutes;