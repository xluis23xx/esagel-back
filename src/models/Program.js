import { Schema, model } from "mongoose";

const programSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    initial_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    sessions: {
        type: String,
        minlength: 9,
        maxlength: 12
    },
    academic_hours: {
        type: Number
    },
    state: {
        type: String
    },
    event: [{
        ref: "Event",
        type: Schema.Types.ObjectId,
    }],
    theme: [{
        ref: "Theme",
        type: Schema.Types.ObjectId,
    }]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Program', programSchema);