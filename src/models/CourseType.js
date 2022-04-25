import { Schema, model } from "mongoose";

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

export default model("CourseType", courseTypeSchema);
