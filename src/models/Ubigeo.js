import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const ubigeoSchema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ubigeoSchema.plugin(mongoosePaginate);

export default model("Ubigeo", ubigeoSchema);
