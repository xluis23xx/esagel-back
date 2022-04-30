import { Schema, model } from "mongoose";

const statusProspectSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('StatusProspect', statusProspectSchema);