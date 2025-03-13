import { body } from "express-validator";
import { BadRequestError } from "@bhtickix/common";

import User from "../models/user.model.js";

export const signinValidator = [
  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password must be provided"),
];

export const signupValidator = [
  body("name").trim().notEmpty().withMessage("Invalid name"),
  body("YOB")
    .isInt({
      min: 1900,
      max: new Date().getFullYear(),
    })
    .withMessage("Invalid year of birth"),
  body("gender").isBoolean().withMessage("Invalid gender"),
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new BadRequestError("Email already exists! Please login.");
      }
      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];
