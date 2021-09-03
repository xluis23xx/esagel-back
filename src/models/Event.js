import { Schema } from "mongoose";

const eventSchema = new Schema({
    code: {
        type: String,
        unique: true
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

export default model('Event', eventSchema)