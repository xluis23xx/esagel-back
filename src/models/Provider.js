import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const providerSchema = new Schema(
  {
    businessName: {
      type: String,
    },
    contactName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      minlength: 7,
      maxlength: 12,
    },
    documentNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: Number,
    },
    documentType: {
      ref: "Document",
      type: Schema.Types.ObjectId, //relaciona con documento
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

providerSchema.plugin(mongoosePaginate);

export default model("Provider", providerSchema);
