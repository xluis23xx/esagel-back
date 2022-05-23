import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    percentIva: {
      type: Number,
    },
    subtotal: {
      type: Number,
    },
    amountInIva: {
      type: Number,
    },
    total: {
      type: Number,
    },
    status: {
      type: Number,
    },
    seller: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    client: {
      ref: "Client",
      type: Schema.Types.ObjectId,
    },
    documentType: {
      ref: "Document",
      type: Schema.Types.ObjectId,
    },
    documentNumber: {
      type: String,
      unique: true,
    },
    orderLines: [
      {
        ref: "OrderDetail",
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
