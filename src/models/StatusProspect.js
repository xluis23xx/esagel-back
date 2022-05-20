import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const statusProspectSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
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

statusProspectSchema.plugin(mongoosePaginate);

export default model("StatusProspect", statusProspectSchema);
