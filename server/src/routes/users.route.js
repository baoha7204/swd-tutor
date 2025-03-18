import { Router } from "express";
import { requestValidation, requireAuth } from "@bhtickix/common";
import usersController from "../controllers/users.controller.js";
import {
  changePasswordValidator,
  editProfileValidator,
} from "../validators/users.validator.js";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";

const usersRouter = Router();
usersRouter.use(requireAuth);

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               avatar:
 *                 type: string
 *                 description: URL to user's avatar image
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
usersRouter.put(
  "/profile",
  editProfileValidator,
  requestValidation,
  usersController.putEditProfile
);

/**
 * @swagger
 * /users/profile/password:
 *   patch:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 description: Current password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
usersRouter.patch(
  "/profile/password",
  changePasswordValidator,
  requestValidation,
  usersController.patchEditPassword
);

// ADMIN ONLY
usersRouter.use(requireAdmin);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   name:
 *                     type: string
 *                   avatar:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Forbidden - User is not an admin
 */
usersRouter.get("/", usersController.getUsers);

export default usersRouter;
