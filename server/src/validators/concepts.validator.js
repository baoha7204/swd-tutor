import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "@bhtickix/common";

import Concept from "../models/concept.model.js";
import Subject from "../models/subject.model.js";

export const addConceptValidator = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .custom(async (value) => {
      const existingConcept = await Concept.findOne({ name: value });
      if (existingConcept) {
        throw new BadRequestError("Concept already exists");
      }
      return true;
    }),
  body("symbolNotation")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Symbol notation is required"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  body("difficultyLevel")
    .isInt({ min: 1, max: 10 })
    .withMessage("Difficulty level must be between 1 and 10"),
  body("subjectId")
    .isMongoId()
    .withMessage("Subject ID must be provided")
    .custom(async (subjectId) => {
      const subject = await Subject.findById(subjectId);
      if (!subject) {
        throw new NotFoundError("Subject not found");
      }
      return true;
    }),
];

export const conceptIdValidator = [
  param("id")
    .exists()
    .withMessage("Concept ID is required")
    .isMongoId()
    .withMessage("Invalid concept ID")
    .custom(async (id) => {
      const concept = await Concept.findById(id);
      if (!concept) {
        throw new NotFoundError("Concept not found");
      }
      return true;
    }),
];

export const editConceptValidator = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("symbolNotation")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Symbol notation is required"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  body("difficultyLevel")
    .isInt({ min: 1, max: 10 })
    .withMessage("Difficulty level must be between 1 and 10"),
  body("subjectId")
    .isMongoId()
    .withMessage("Subject ID must be provided")
    .custom(async (subjectId) => {
      const subject = await Subject.findById(subjectId);
      if (!subject) {
        throw new NotFoundError("Subject not found");
      }
      return true;
    }),
];
