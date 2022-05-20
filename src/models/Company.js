import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const companySchema = new Schema(
  {
    business_name: {
      type: String,
    },
    address: {
      type: String,
    },
    movil: {
      type: String,
      minlength: 9,
      maxlength: 12,
    },
    email: {
      type: String,
      unique: true,
    },
    number_doc: {
      type: String,
      unique: true,
    },
    document: [
      {
        ref: "Document",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

companySchema.plugin(mongoosePaginate);

export default model("Company", companySchema);
