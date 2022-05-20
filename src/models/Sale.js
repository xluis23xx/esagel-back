import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const saleSchema = new Schema(
  {
    sale_type: {
      type: String,
    },
    date: {
      type: Date,
    },
    tax: {
      type: Number,
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

saleSchema.plugin(mongoosePaginate);

export default model("Sale", saleSchema);
