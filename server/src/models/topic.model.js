import mongoose, { Schema } from "mongoose";
import DifficultyRange from "../data/difficulty-range.js";

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: Number,
      required: true,
      unique: true,
    },
    difficultyRange: {
      type: String,
      required: true,
      enum: Object.values(DifficultyRange),
    },
    estimatedStudyHours: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    subtopics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subtopic",
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

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
