import { Schema, model } from "mongoose";

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

export default model("Leadsource", leadSourceSchema);
