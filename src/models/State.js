import { Schema } from "mongoose";

const stateSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('State', stateSchema);