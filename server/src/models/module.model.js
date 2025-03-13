import mongoose, { Schema } from "mongoose";
import ModuleType from "../data/module-type";

const moduleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    position: { type: Number, required: true, unique: true },
    moduleType: {
      type: String,
      required: true,
      enum: Object.values(ModuleType),
    },
    xpReward: { type: Number, required: true },
    difficultyLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    estimatedMinutes: { type: Number, required: true },
    excercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Excercise",
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

const Module = mongoose.model("Module", moduleSchema);

export default Module;
