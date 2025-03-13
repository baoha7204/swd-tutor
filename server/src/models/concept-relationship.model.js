import mongoose, { Schema } from "mongoose";
import RelationshipType from "../data/relationship-type";

const conceptRelationshipSchema = new Schema(
  {
    sourceConcept: {
      type: Schema.Types.ObjectId,
      ref: "Concept",
      required: true,
    },
    targetConcept: {
      type: Schema.Types.ObjectId,
      ref: "Concept",
      required: true,
    },
    relationshipType: {
      type: String,
      required: true,
      enum: Object.values(RelationshipType),
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

const ConceptRelationship = mongoose.model(
  "ConceptRelationship",
  conceptRelationshipSchema
);

export default ConceptRelationship;
