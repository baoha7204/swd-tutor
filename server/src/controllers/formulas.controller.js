import { BadRequestError, DatabaseConnectionError } from "@bhtickix/common";
import mongoose from "mongoose";

import Formula from "../models/formula.model.js";
import Concept from "../models/concept.model.js";

const getFormulas = async (req, res) => {
  // Filter by concept if provided in query
  const conceptId = req.query.concept;

  let filter = {};
  if (conceptId) {
    filter.concept = conceptId;
  }

  const formulas = await Formula.find(filter).populate(
    "concept",
    "name symbolNotation"
  );
  res.send(formulas);
};

const getFormula = async (req, res) => {
  const { id } = req.params;

  const formula = await Formula.findById(id).populate(
    "concept",
    "name symbolNotation"
  );
  res.send(formula);
};

const postAddFormula = async (req, res) => {
  const { name, latexNotation, plainText, description, conceptId } = req.body;

  try {
    const formula = new Formula({
      name,
      latexNotation,
      plainText,
      description,
      concept: conceptId,
    });

    await formula.save();

    // Update concept to include this formula
    await Concept.findByIdAndUpdate(conceptId, {
      $push: { formula: formula._id },
    });

    res.status(201).send(formula);
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

const putEditFormula = async (req, res) => {
  const { id } = req.params;
  const { name, latexNotation, plainText, description, conceptId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const formula = await Formula.findById(id);

    // If concept is changing, update both old and new concept
    if (conceptId && formula.concept.toString() !== conceptId) {
      // Remove formula from old concept
      await Concept.findByIdAndUpdate(
        formula.concept,
        { $pull: { formula: formula._id } },
        { session }
      );

      // Add formula to new concept
      await Concept.findByIdAndUpdate(
        conceptId,
        { $push: { formula: formula._id } },
        { session }
      );

      formula.concept = conceptId;
    }

    formula.name = name;
    formula.latexNotation = latexNotation;
    formula.plainText = plainText;
    formula.description = description;

    await formula.save({ session });
    await session.commitTransaction();

    res.send(formula);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteFormula = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const formula = await Formula.findById(id);

    // Remove reference from concept
    await Concept.findByIdAndUpdate(
      formula.concept,
      { $pull: { formula: formula._id } },
      { session }
    );

    await Formula.findByIdAndDelete(id, { session });
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
  getFormulas,
  getFormula,
  postAddFormula,
  putEditFormula,
  deleteFormula,
};
