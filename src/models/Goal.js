import { Schema } from "mongoose";

const goalSchema = new Schema({
    initial_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    amount: {
        type: Number
    },
    amount_sold: {
        type: Number
    },
    employee: [{
        ref: "Employee",
        type: Schema.Types.ObjectId,
    }]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Goal', goalSchema);