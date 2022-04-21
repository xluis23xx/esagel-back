import { Schema, model } from "mongoose";

const programSchema = new Schema({ //tipocursoo
    code: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true
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

export default model('Program', programSchema);