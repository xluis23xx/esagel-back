import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const saleSchema = new Schema(
  {
    saleNumber: {
      type: String,
    },
    seller: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    client: { ref: "Client", type: Schema.Types.ObjectId },
    percentIva: { type: Number },
    subtotal: { type: Number },
    amountInIva: { type: Number },
    total: { type: Number },
    status: {
      type: Number,
    },
    order: {
      ref: "Order",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

saleSchema.plugin(mongoosePaginate);

export default model("Sale", saleSchema);
