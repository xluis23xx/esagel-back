import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const goalSchema = new Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    estimatedQuantity: {
      type: Number,
    },
    quantitySold: {
      type: Number,
    },
    seller: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    status: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

goalSchema.plugin(mongoosePaginate);

export default model("Goal", goalSchema);
