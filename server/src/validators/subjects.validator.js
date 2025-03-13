import { body } from "express-validator";

export const addSubjectValidator = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("iconUrl").trim().not().isEmpty().withMessage("Icon URL is required"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
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
