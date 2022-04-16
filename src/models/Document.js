import {Schema, model} from 'mongoose'

const documentSchema = new Schema({
    name: String,
    operation: String,
    state: Number
}, {
    timestamps: true,
    versionKey: false
})

export default model('Document', documentSchema);