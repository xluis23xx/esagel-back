import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
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

contactSchema.plugin(mongoosePaginate);

export default model("Contact", contactSchema);
