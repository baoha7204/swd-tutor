import { Router } from "express";
import { requestValidation, requireAuth } from "@bhtickix/common";

import authController from "../controllers/auth.controller.js";

import {
  signinValidator,
  signupValidator,
} from "../validators/auth.validator.js";

const authRouter = Router();

/**
 * @swagger
 * /auth/self:
 *   get:
 *     summary: Get current user information
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentUser:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Not authenticated
 */
authRouter.get("/self", authController.getSelf);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       400:
 *         description: Invalid credentials
 */
authRouter.post(
  "/signin",
  signinValidator,
  requestValidation,
  authController.postSignin
);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input or email already exists
 */
authRouter.post(
  "/signup",
  signupValidator,
  requestValidation,
  authController.postSignup
);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     summary: Sign out current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully signed out
 *       401:
 *         description: Not authenticated
 */
authRouter.post("/signout", requireAuth, authController.postSignout);

export default authRouter;
