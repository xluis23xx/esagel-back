import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const documentSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    operation: {
      type: String,
    },
    status: {
      type: Number,
    },
    code: {
      type: String,
      unique: true,
    },
    sequential: {
      type: Number,
    },
    length: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

documentSchema.plugin(mongoosePaginate);

export default model("Document", documentSchema);
