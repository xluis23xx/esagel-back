import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const settingSchema = new Schema(
  {
    companyName: {
      type: String,
    },
    description: {
      type: String,
    },
    businessName: {
      type: String,
    },
    ruc: {
      type: String,
      unique: true,
    },
    url: {
      type: String,
    },
    logo: {
      type: String,
    },
    tax: {
      type: Number,
    },
    manual: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

settingSchema.plugin(mongoosePaginate);

export default model("Setting", settingSchema);
