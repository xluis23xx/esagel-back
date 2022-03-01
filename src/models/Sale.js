import { Schema } from "mongoose";

const saleSchema = new Schema({
    sale_type:{
        type: String
    },
    date: {
        type: Date
    },
    tax: {
        type: Number   
    },
    amount: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Sale', saleSchema);