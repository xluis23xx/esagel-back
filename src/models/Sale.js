import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const saleSchema = new Schema(
  {
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
