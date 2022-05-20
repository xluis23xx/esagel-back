import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const leadSourceSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
    },
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

leadSourceSchema.plugin(mongoosePaginate);

export default model("Leadsource", leadSourceSchema);
