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
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId, //relaciona con documento
    }]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Goal', goalSchema);