const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Base de datos funcionando 🚀");
    } catch (error) {
        console.log("Error en la base de datos ❌");
    }
}

module.exports = { connectDB }