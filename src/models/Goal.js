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
    employee: [
      {
        ref: "Employee",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

goalSchema.plugin(mongoosePaginate);

export default model("Goal", goalSchema);
