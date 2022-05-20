import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const courseTypeSchema = new Schema(
  {
    //tipo curso
    code: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
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

courseTypeSchema.plugin(mongoosePaginate);

export default model("CourseType", courseTypeSchema);
