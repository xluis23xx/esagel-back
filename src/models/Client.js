import { Schema } from "mongoose";

const clientSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    secondLastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        minlength: 7,
        maxlength: 12
    },
    address: {
        type: String
    },
    documentNumber: {
        type: String,
        unique: true,
    },
    birthdate: {
        type: Date
    },
    documentType: [{
        ref: "Document",
        type: Schema.Types.ObjectId, //relaciona con documento
    }],
    department: {
        type: String
    },
    leadSource: {
        type: String
    },
    prospectStatus: {
        type: String
    },
    contactForm: {
        type: String
    },
    profession: {
        type: String
    },
    business: {
        type: String
    },
    status: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Client', clientSchema);