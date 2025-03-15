import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "@bhtickix/common";
import ModuleType from "../data/module-type.js";
import Module from "../models/module.model.js";
import Subtopic from "../models/subtopic.model.js";

const validateModuleId = [
  param("id")
    .exists()
    .withMessage("Module ID is required")
    .isMongoId()
    .withMessage("Valid module ID is required")
    .custom(async (id) => {
      const module = await Module.findById(id);
      if (!module) {
        throw new NotFoundError("Module not found");
      }
      return true;
    }),
];

const validateModuleCreate = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Module name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Module name must be between 2 and 100 characters")
    .custom(async (value) => {
      const existingModule = await Module.findOne({ name: value });
      if (existingModule) {
        throw new BadRequestError("Module with this name already exists");
      }
      return true;
    }),
  body("position")
    .isInt({ min: 0 })
    .withMessage("Position must be a positive integer"),
  body("moduleType")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Module type is required")
    .isIn(Object.values(ModuleType))
    .withMessage("Invalid module type"),
  body("xpReward")
    .isInt({ min: 1 })
    .withMessage("XP reward must be a positive integer"),
  body("difficultyLevel")
    .isInt({ min: 1, max: 5 })
    .withMessage("Difficulty level must be between 1 and 5"),
  body("estimatedMinutes")
    .isInt({ min: 1 })
    .withMessage("Estimated minutes must be a positive integer"),
  body("subtopicId")
    .isMongoId()
    .withMessage("Valid subtopic ID is required")
    .custom(async (value) => {
      const subtopic = await Subtopic.findById(value);
      if (!subtopic) {
        throw new NotFoundError("Subtopic not found");
      }
      return true;
    }),
];

const validateModuleUpdate = [
  param("id").isMongoId().withMessage("Valid module ID is required"),
  body("name")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Module name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Module name must be between 2 and 100 characters"),
  body("position")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Position must be a positive integer"),
  body("moduleType")
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Module type is required")
    .isIn(Object.values(ModuleType))
    .withMessage("Invalid module type"),
  body("xpReward")
    .optional()
    .isInt({ min: 1 })
    .withMessage("XP reward must be a positive integer"),
  body("difficultyLevel")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Difficulty level must be between 1 and 5"),
  body("estimatedMinutes")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Estimated minutes must be a positive integer"),
  body("subtopicId")
    .optional()
    .isMongoId()
    .withMessage("Valid subtopic ID is required")
    .custom(async (value) => {
      const subtopic = await Subtopic.findById(value);
      if (!subtopic) {
        throw new NotFoundError("Subtopic not found");
      }
      return true;
    }),
];

export default {
  validateModuleId,
  validateModuleCreate,
  validateModuleUpdate,
};
