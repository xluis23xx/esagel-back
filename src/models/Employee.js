import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    secondLastname: {
        type: String
    },
    phoneNumber: {
        type: String,
        minlength: 7,
        maxlength: 12
    },
    personalEmail: {
        type: String,
        unique: true
    },
    corporateEmail: {
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
        ref: "Position",
        type: Schema.Types.ObjectId,
    },
    documentNumber: {
        type: String,
        unique: true,
    },
    status: {
        type: Number
    },
    documentType: {
        ref: "Document",
        type: Schema.Types.ObjectId, //relaciona con documento
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Employee', employeeSchema);