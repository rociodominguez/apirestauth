const User = require("../api/models/user");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json("No autorizado ✋")
        }

        const parsedToken = token.replace("Bearer ", "");
        const { id } = verifyJwt(parsedToken);

        const user = await User.findById(id);
        req.password = null;
        req.user = user;
        next();

    } catch (error) {
        return res.status(400).json("Error en el token")
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const parsedToken = token.replace("Bearer ", "");
        const { id } = verifyJwt(parsedToken);
        const user = await User.findById(id);

        if(user.rol === "admin") {
            req.password = null;
            req.user = user;
            next();
        } else {
            return res.status(400).json("Solo admins ❌")
        }

    } catch (error) {
        return res.status(400).json("Error en el token")
    }
}

module.exports = { isAuth, isAdmin }