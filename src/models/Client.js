import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const clientSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    secondLastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      minlength: 7,
      maxlength: 12,
    },
    address: {
      type: String,
    },
    documentNumber: {
      type: String,
      unique: true,
    },
    birthdate: {
      type: Date,
    },
    documentType: {
      ref: "Document",
      type: Schema.Types.ObjectId,
    },
    department: {
      ref: "Ubigeo",
      type: Schema.Types.ObjectId,
    },
    leadSource: {
      ref: "Leadsource",
      type: Schema.Types.ObjectId,
    },
    prospectStatus: {
      ref: "StatusProspect",
      type: Schema.Types.ObjectId,
    },
    contactForm: {
      ref: "Contact",
      type: Schema.Types.ObjectId,
    },
    profession: {
      type: String,
    },
    business: {
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

clientSchema.plugin(mongoosePaginate);

export default model("Client", clientSchema);
