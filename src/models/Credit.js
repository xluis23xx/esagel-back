import { Schema } from "mongoose";

const creditSchema = new Schema({
    payment_date: {
        type: Date
    },
    payment_amount: {
        type: Number
    },
    amount_paid: {
        type: Number
    },
    debt_amount: {
        type: Number
    }
})

export default model('Credit', creditSchema);