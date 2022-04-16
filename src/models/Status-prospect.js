import { Schema, model } from "mongoose";

const statusProspectSchema = new Schema({
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

export default model('StatusProspect', statusProspectSchema);