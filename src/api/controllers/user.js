const { generateSign } = require("../../config/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
    try {
        const newUser = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            birthdate: req.body.birthdate,
            rol: "user",
            image: req.body.image
        });

        const duplicatedUser = await User.findOne({ userName: req.body.userName });

        if (duplicatedUser) {
            return res.status(400).json("Nombre de usuario ya existente");
        }

        const userSaved = await newUser.save();

        return res.status(201).json(userSaved);


    } catch (error) {
        return res.status(400).json("Error al registrar usuario")
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = generateSign(user._id);
                return res.status(200).json({ user, token })
            }
        } else {
            return res.status(400).json("Usuario o contraseña incorrectos");
        }

    } catch (error) {
        return res.status(400).json("Este usuario ya existe");
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id);
        return res.status(200).json(userDeleted)
    } catch (error) {
        res.status(400).json(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = { login, register, deleteUser, getUsers }