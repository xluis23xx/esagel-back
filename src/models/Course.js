import {Schema, model} from 'mongoose'

const courseSchema = new Schema({
    code: { 
        type: String
    },
    name: { 
        type: String
    },
    category: { 
        type: String
    },
    price: {
        type: Number
    },
    imgURL: {
        type: String
    },
    program: [{
        ref: "Program",
        type: Schema.Types.ObjectId,
    }]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Course', courseSchema);