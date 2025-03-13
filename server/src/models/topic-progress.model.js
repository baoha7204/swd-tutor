import mongoose, { Schema } from "mongoose";

const topicProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    masteryPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedSubtopics: {
      type: Number,
      default: 0,
    },
    crownLevel: {
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

const TopicProgress = mongoose.model("TopicProgress", topicProgressSchema);

export default TopicProgress;
