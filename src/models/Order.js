import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new Schema(
  {
    order_date: {
      type: String,
    },
    user: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    client: [
      {
        ref: "Client",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.plugin(mongoosePaginate);

export default model("Order", orderSchema);
