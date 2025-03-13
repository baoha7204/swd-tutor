import mongoose, { Schema } from "mongoose";

const excerciseSchema = new Schema(
  {
    excerciseType: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    hint: {
      type: String,
      default: "",
    },
    difficultyLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    concepts: [
      {
        concept: {
          type: Schema.Types.ObjectId,
          ref: "Concept",
        },
        isPrimaryFocus: {
          type: Boolean,
          required: true,
        },
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

const Excercise = mongoose.model("Excercise", excerciseSchema);

export default Excercise;
