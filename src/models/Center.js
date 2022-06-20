import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const centerSchema = new Schema(
  {
    branchName: {
      type: String,
    },
    address : {
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

centerSchema.plugin(mongoosePaginate);

export default model("Center", centerSchema);
