import mongoose, { Schema } from "mongoose";

const conceptSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    symbolNotation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: Number,
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    formula: [
      {
        type: Schema.Types.ObjectId,
        ref: "Formula",
      },
    ],
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

const Concept = mongoose.model("Concept", conceptSchema);

export default Concept;
