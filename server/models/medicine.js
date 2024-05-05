import mongoose from "mongoose"

const medicineSchema = new mongoose.Schema({
    name: String,
    type: Array,
    dosage: String,
    price: Number,
    cuantity: Number,
    description: String, 
    favorite: Boolean,
})

const model = mongoose.model("medicineCreate", medicineSchema);
export default model;