import mongoose, { Schema } from "mongoose";

const formulaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latexNotation: {
      type: String,
      required: true,
    },
    plainText: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Formula = mongoose.model("Formula", formulaSchema);

export default Formula;
