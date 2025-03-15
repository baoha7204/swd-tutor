import { BadRequestError, DatabaseConnectionError } from "@bhtickix/common";
import mongoose from "mongoose";

import Concept from "../models/concept.model.js";
import Subject from "../models/subject.model.js";

const getConcepts = async (req, res) => {
  // Filter by difficulty level or subject if provided in query
  const difficultyLevel = req.query.difficulty;
  const subjectId = req.query.subject;

  let filter = {};
  if (difficultyLevel) {
    filter.difficultyLevel = difficultyLevel;
  }
  if (subjectId) {
    filter.subject = subjectId;
  }

  const concepts = await Concept.find(filter)
    .populate("formula")
    .populate("subject", "name iconUrl");

  res.send(concepts);
};

const getConcept = async (req, res) => {
  const { id } = req.params;

  const concept = await Concept.findById(id)
    .populate("formula")
    .populate("subject", "name iconUrl");

  res.send(concept);
};

const postAddConcept = async (req, res) => {
  const { name, symbolNotation, description, difficultyLevel, subjectId } =
    req.body;

  try {
    const concept = new Concept({
      name,
      symbolNotation,
      description,
      difficultyLevel,
      subject: subjectId,
    });

    await concept.save();

    // Update subject to include this concept
    await Subject.findByIdAndUpdate(subjectId, {
      $push: { concepts: concept._id },
    });

    res.status(201).send(concept);
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

const putEditConcept = async (req, res) => {
  const { id } = req.params;
  const { name, symbolNotation, description, difficultyLevel, subjectId } =
    req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const concept = await Concept.findById(id);

    // Check if name is being changed and if it already exists
    if (name !== concept.name) {
      const existingConcept = await Concept.findOne({ name });
      if (existingConcept) {
        throw new BadRequestError("Concept with this name already exists");
      }
    }

    // If subject is changing, update both old and new subject
    if (subjectId && concept.subject.toString() !== subjectId) {
      // Remove concept from old subject
      await Subject.findByIdAndUpdate(
        concept.subject,
        { $pull: { concepts: concept._id } },
        { session }
      );

      // Add concept to new subject
      await Subject.findByIdAndUpdate(
        subjectId,
        { $push: { concepts: concept._id } },
        { session }
      );

      concept.subject = subjectId;
    }

    concept.name = name;
    concept.symbolNotation = symbolNotation;
    concept.description = description;
    concept.difficultyLevel = difficultyLevel;

    await concept.save({ session });
    await session.commitTransaction();

    res.send(concept);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteConcept = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if concept has associated formulas
    const concept = await Concept.findById(id);

    if (concept.formula && concept.formula.length > 0) {
      throw new BadRequestError("Cannot delete concept with existing formulas");
    }

    // Remove reference from subject
    await Subject.findByIdAndUpdate(
      concept.subject,
      { $pull: { concepts: concept._id } },
      { session }
    );

    await Concept.findByIdAndDelete(id, { session });
    await session.commitTransaction();

    res.status(204).send({});
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export default {
  getConcepts,
  getConcept,
  postAddConcept,
  putEditConcept,
  deleteConcept,
};
