import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const goalSchema = new Schema(
  {
    initial_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    amount: {
      type: Number,
    },
    amount_sold: {
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
