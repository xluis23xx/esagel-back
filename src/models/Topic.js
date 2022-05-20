import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const topicSchema = new Schema(
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

topicSchema.plugin(mongoosePaginate);

export default model("Topic", topicSchema);
