import { Schema, model } from "mongoose";

const leadsourceSchema = new Schema({
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

export default model('Leadsource', leadsourceSchema);