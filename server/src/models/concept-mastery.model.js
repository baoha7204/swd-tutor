import mongoose, { Schema } from "mongoose";

const conceptMasterySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    concept: {
      type: Schema.Types.ObjectId,
      ref: "Concept",
      required: true,
    },
    masteryPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    practiceCount: {
      type: Number,
      default: 0,
    },
    nextReviewDate: {
      type: Number, // miliseconds
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

const ConceptMastery = mongoose.model("ConceptMastery", conceptMasterySchema);

export default ConceptMastery;
