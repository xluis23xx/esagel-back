import { Schema } from "mongoose";

const journalSchema = new Schema({
    name: {
        type: String
    },
    serie: {
        type: String
    },
    number_serie: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Journal', journalSchema)