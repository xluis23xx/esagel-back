import { Schema, model } from "mongoose";

const positionSchema = new Schema({
    name: {
        type: String
    },
    status: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Position', positionSchema);