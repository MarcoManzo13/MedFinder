import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    contrasena: String,
    celular: String,
    genero: String,
    altura: String,
    peso: String,
    alergies: Array,
    ansiedad: String,
    diabetes: String,
    presion: String,
    depresion: String,
    cancer: String,
})

const model = mongoose.model("userCreate", userSchema);

export default model;