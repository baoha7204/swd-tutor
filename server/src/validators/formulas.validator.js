import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "@bhtickix/common";

import Formula from "../models/formula.model.js";
import Concept from "../models/concept.model.js";

export const addFormulaValidator = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("latexNotation")
    .trim()
    .not()
    .isEmpty()
    .withMessage("LaTeX notation is required"),
  body("plainText")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Plain text representation is required"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  body("conceptId")
    .isMongoId()
    .withMessage("Concept ID must be provided")
    .custom(async (conceptId) => {
      const concept = await Concept.findById(conceptId);
      if (!concept) {
        throw new NotFoundError("Concept not found");
      }
      return true;
    }),
];

export const formulaIdValidator = [
  param("id")
    .exists()
    .withMessage("Formula ID is required")
    .isMongoId()
    .withMessage("Invalid formula ID")
    .custom(async (id) => {
      const formula = await Formula.findById(id);
      if (!formula) {
        throw new NotFoundError("Formula not found");
      }
      return true;
    }),
];

export const editFormulaValidator = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("latexNotation")
    .trim()
    .not()
    .isEmpty()
    .withMessage("LaTeX notation is required"),
  body("plainText")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Plain text representation is required"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  body("conceptId")
    .isMongoId()
    .withMessage("Concept ID must be provided")
    .custom(async (conceptId) => {
      const concept = await Concept.findById(conceptId);
      if (!concept) {
        throw new NotFoundError("Concept not found");
      }
      return true;
    }),
];
