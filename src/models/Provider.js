import { Schema } from "mongoose";

const providerSchema = new Schema({
    name: {
        type: String
    },
    movil: {
        type: String
    },
    number_doc: {
        type: String,
        unique: true,
    },
    document: [{
        ref: "Document",
        type: Schema.Types.ObjectId, //relaciona con documento
    }]
}, {
    timestamps: true,
    versionKey: false
})