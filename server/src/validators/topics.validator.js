import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "@bhtickix/common";

import Topic from "../models/topic.model.js";
import Subject from "../models/subject.model.js";
import DifficultyRange from "../data/difficulty-range.js";

export const addTopicValidator = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .custom(async (value) => {
      const existingTopic = await Topic.findOne({ name: value });
      if (existingTopic) {
        throw new BadRequestError("Topic already exists");
      }
      return true;
    }),
  body("subjectId")
    .isMongoId()
    .withMessage("Invalid subject ID")
    .custom(async (value) => {
      const subject = await Subject.findById(value);
      if (!subject) {
        throw new NotFoundError("Subject not found");
      }
      return true;
    }),
  body("position")
    .isInt({ min: 1 })
    .withMessage("Position must be a positive integer")
    .custom(async (value) => {
      const existingTopic = await Topic.findOne({ position: value });
      if (existingTopic) {
        throw new BadRequestError("Topic with this position already exists");
      }
      return true;
    }),
  body("difficultyRange")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Difficulty range is required")
    .isIn(Object.values(DifficultyRange))
    .withMessage("Invalid difficulty range"),
  body("estimatedStudyHours")
    .isNumeric()
    .withMessage("Estimated study hours must be a number")
    .isFloat({ min: 0 })
    .withMessage("Estimated study hours must be a positive number"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];

export const topicIdValidator = [
  param("id")
    .exists()
    .withMessage("Topic ID is required")
    .isMongoId()
    .withMessage("Invalid topic ID")
    .custom(async (id) => {
      const topic = await Topic.findById(id);
      if (!topic) {
        throw new NotFoundError("Topic not found");
      }
      return true;
    }),
];

export const editTopicValidator = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("subjectId")
    .isMongoId()
    .withMessage("Invalid subject ID")
    .custom(async (value) => {
      const subject = await Subject.findById(value);
      if (!subject) {
        throw new NotFoundError("Subject not found");
      }
      return true;
    }),
  body("position")
    .isInt({ min: 1 })
    .withMessage("Position must be a positive integer"),
  body("difficultyRange")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Difficulty range is required")
    .isIn(Object.values(DifficultyRange))
    .withMessage("Invalid difficulty range"),
  body("estimatedStudyHours")
    .isNumeric()
    .withMessage("Estimated study hours must be a number")
    .isFloat({ min: 0 })
    .withMessage("Estimated study hours must be a positive number"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];
