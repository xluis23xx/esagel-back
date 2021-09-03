import { Schema } from "mongoose";

const themeSchema = new Schema({
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

export default model('Theme', themeSchema);