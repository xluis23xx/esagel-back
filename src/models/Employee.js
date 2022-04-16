import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    mother_lastname: {
        type: String
    },
    movil: {
        type: String,
        minlength: 9,
        maxlength: 12
    },
    email_personal: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    birthdate: {
        type: Date
    },
    image: {
        type: String
    },
    position: {
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

export default model('Employee', employeeSchema);