import { Schema, model } from "mongoose";

const profileSchema = new Schema({
    name: String,
    lastname: String,
    movil: String
}, {
    timestamps: true,
    versionKey: false
})

export default model('Profile', profileSchema);