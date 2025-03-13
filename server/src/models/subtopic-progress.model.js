import mongoose, { Schema } from "mongoose";

const subtopicProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtopic: {
      type: Schema.Types.ObjectId,
      ref: "Subtopic",
      required: true,
    },
    masteryPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedModules: {
      type: Number,
      default: 0,
    },
    totalXp: {
      type: Number,
      default: 0,
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

const SubtopicProgress = mongoose.model(
  "SubtopicProgress",
  subtopicProgressSchema
);

export default SubtopicProgress;
