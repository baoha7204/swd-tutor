import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "@bhtickix/common";

import Subject from "../models/subject.model.js";

export const addSubjectValidator = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .custom(async (value) => {
      const existingSubject = await Subject.findOne({ name: value });
      if (existingSubject) {
        throw new BadRequestError("Subject already exists");
      }
      return true;
    }),
  body("iconUrl").trim().not().isEmpty().withMessage("Icon URL is required"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];

export const subjectIdValidator = [
  param("id")
    .exists()
    .isMongoId()
    .withMessage("Invalid subject ID")
    .custom(async (id) => {
      const subject = await Subject.findById(id);
      if (!subject) {
        throw new NotFoundError("Subject not found");
      }
      return true;
    }),
];

export const editSubjectValidator = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("iconUrl").trim().not().isEmpty().withMessage("Icon URL is required"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];
