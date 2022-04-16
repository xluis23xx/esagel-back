import { Schema, model } from "mongoose";

const providerSchema = new Schema({
    name_business: {
        type: String
    },
    contact: {
        type: String
    },
    movil: {
        type: String
    },
    number_doc: {
        type: String,
        unique: true,
    },
    state: {
        type: Number
    },
    document: [{
        ref: "Document",
        type: Schema.Types.ObjectId, //relaciona con documento
    }]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Provider', providerSchema);