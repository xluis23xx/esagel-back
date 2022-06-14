import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: String,
    priority: Number,
  },
  {
    versionKey: false,
  }
);

roleSchema.plugin(mongoosePaginate);

export default model("Role", roleSchema);
