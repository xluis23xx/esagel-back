import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Contact', contactSchema);