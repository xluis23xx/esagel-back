import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const purchaseSchema = new Schema(
  {
    purchaseNumber: {
      type: String,
    },
    name: {
      type: String,
    },
    reason: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
    },
    status: {
      type: Number,
    },
    buyer: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    provider: {
      ref: "Provider",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

purchaseSchema.plugin(mongoosePaginate);

export default model("Purchase", purchaseSchema);
