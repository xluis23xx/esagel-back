import {Schema, model} from 'mongoose'

const documentSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default model('Document', documentSchema);