import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    movil: {
        type: String,
        minlength: 9,
        maxlength: 12
    },
    address: {
        type: String
    },
    birthdate: {
        type: Date
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

export default model('Employee', employeeSchema);