import mongoose from "mongoose"

const pharmacySchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    celular: String,
    contrasena: String,
    nombreFarmacia: String,
    numSucursal: String,
    direccion: String,
    codigoPostal: String,
})

const model = mongoose.model("pharmacyCreate", pharmacySchema);

export default model;