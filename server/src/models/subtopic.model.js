import mongoose, { Schema } from "mongoose";

const subtopicSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    position: { type: Number, required: true, unique: true },
    difficultyScore: { type: Number, required: true },
    estimatedStudyMinutes: { type: Number, required: true },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    concepts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Concept",
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

const Subtopic = mongoose.model("Subtopic", subtopicSchema);

export default Subtopic;
