import { Schema, model } from "mongoose";

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

export default model("Setting", settingSchema);
