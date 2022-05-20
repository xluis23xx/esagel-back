import { Schema, model } from "mongoose";

const expenseSchema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    provider: [
      {
        ref: "Provider",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Expense", expenseSchema);
