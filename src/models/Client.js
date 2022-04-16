import { Schema } from "mongoose";

const clientSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    mother_lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    movil: {
        type: String,
        minlength: 9,
        maxlength: 12
    },
    address: {
        type: String
    },
    number_doc: {
        type: String,
        unique: true,
    },
    birthdate: {
        type: Date
    },
    document: [{
        ref: "Document",
        type: Schema.Types.ObjectId, //relaciona con documento
    }],
    department: {
        type: String
    },
    lead_source: {
        type: String
    },
    prospect_status: {
        type: String
    },
    medium_contact: {
        type: String
    },
    profession: {
        type: String
    },
    business: {
        type: String
    },
    position: {
        type: String
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Client', clientSchema);