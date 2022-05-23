import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const orderDetailSchema = new Schema(
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

orderDetailSchema.plugin(mongoosePaginate);

export default model("OrderDetail", orderDetailSchema);
