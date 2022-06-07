import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const documentSchema = new Schema(
  {
    name: String,
    operation: String,
    status: Number,
    code: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

documentSchema.plugin(mongoosePaginate);

export default model("Document", documentSchema);
