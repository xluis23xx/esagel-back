import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const saleDetailSchema = new Schema(
  {
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    price: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    order: {
      ref: "Order",
      type: Schema.Types.ObjectId,
    },
    course: {
      ref: "Course",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

saleDetailSchema.plugin(mongoosePaginate);

export default model("SaleDetail", saleDetailSchema);
