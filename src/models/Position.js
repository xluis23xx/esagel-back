import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const positionSchema = new Schema(
  {
    name: {
      type: String,
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

positionSchema.plugin(mongoosePaginate);

export default model("Position", positionSchema);
