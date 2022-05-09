import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    modality: {
      type: [String],
    },
    price: {
      type: Number,
    },
    vacanciesNumber: {
      type: Number,
    },
    status: {
      type: Number,
    },
    courseType: {
      ref: "CourseType",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Course", courseSchema);
