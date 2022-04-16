import { Schema } from "mongoose";

const orderSchema = new Schema({
    order_date: {
        type: String
    },
    user:[{
        ref: "User",
        type: Schema.Types.ObjectId,
    }],
    client:[{
        ref: "Client",
        type: Schema.Types.ObjectId,
    }]
}, {
    timestamps: true,
    versionKey: false
})
