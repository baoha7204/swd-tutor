import { body, param } from "express-validator";
import { BadRequestError, NotFoundError } from "@bhtickix/common";

import Subtopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";

export const addSubtopicValidator = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .custom(async (value) => {
      const existingSubtopic = await Subtopic.findOne({ name: value });
      if (existingSubtopic) {
        throw new BadRequestError("Subtopic already exists");
      }
      return true;
    }),
  body("topicId")
    .isMongoId()
    .withMessage("Invalid topic ID")
    .custom(async (value) => {
      const topic = await Topic.findById(value);
      if (!topic) {
        throw new NotFoundError("Topic not found");
      }
      return true;
    }),
  body("position")
    .isInt({ min: 1 })
    .withMessage("Position must be a positive integer")
    .custom(async (value) => {
      const existingSubtopic = await Subtopic.findOne({ position: value });
      if (existingSubtopic) {
        throw new BadRequestError("Subtopic with this position already exists");
      }
      return true;
    }),
  body("difficultyScore")
    .isInt({ min: 1, max: 10 })
    .withMessage("Difficulty score must be between 1 and 10"),
  body("estimatedStudyMinutes")
    .isInt({ min: 1 })
    .withMessage("Estimated study minutes must be a positive integer"),
];

export const subtopicIdValidator = [
  param("id")
    .exists()
    .withMessage("Subtopic ID is required")
    .isMongoId()
    .withMessage("Invalid subtopic ID")
    .custom(async (id) => {
      const subtopic = await Subtopic.findById(id);
      if (!subtopic) {
        throw new NotFoundError("Subtopic not found");
      }
      return true;
    }),
];

export const editSubtopicValidator = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("topicId")
    .isMongoId()
    .withMessage("Invalid topic ID")
    .custom(async (value) => {
      const topic = await Topic.findById(value);
      if (!topic) {
        throw new NotFoundError("Topic not found");
      }
      return true;
    }),
  body("position")
    .isInt({ min: 1 })
    .withMessage("Position must be a positive integer"),
  body("difficultyScore")
    .isInt({ min: 1, max: 10 })
    .withMessage("Difficulty score must be between 1 and 10"),
  body("estimatedStudyMinutes")
    .isInt({ min: 1 })
    .withMessage("Estimated study minutes must be a positive integer"),
];
