import { Router } from "express";
import { requestValidation, requireAuth } from "@bhtickix/common";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";
import subjectsController from "../controllers/subjects.controller.js";
import {
  addSubjectValidator,
  editSubjectValidator,
  subjectIdValidator,
} from "../validators/subjects.validator.js";

const subjectsRouter = Router();

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: List of all subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   isDeleted:
 *                     type: boolean
 */
subjectsRouter.get("/", subjectsController.getSubjects);

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Get a specific subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject details
 *       404:
 *         description: Subject not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subjectsRouter.get(
  "/:id",
  subjectIdValidator,
  requestValidation,
  subjectsController.getSubject
);

// ADMIN ONLY
subjectsRouter.use(requireAuth);
subjectsRouter.use(requireAdmin);

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the subject
 *               description:
 *                 type: string
 *                 description: Description of the subject
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subjectsRouter.post(
  "/",
  addSubjectValidator,
  requestValidation,
  subjectsController.postAddSubject
);

/**
 * @swagger
 * /subjects/{id}:
 *   put:
 *     summary: Update a subject
 *     tags: [Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the subject
 *               description:
 *                 type: string
 *                 description: Description of the subject
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Subject not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subjectsRouter.put(
  "/:id",
  [...subjectIdValidator, ...editSubjectValidator],
  requestValidation,
  subjectsController.putEditSubject
);

/**
 * @swagger
 * /subjects/soft/{id}:
 *   delete:
 *     summary: Soft delete a subject
 *     tags: [Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject soft deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Subject not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subjectsRouter.delete(
  "/soft/:id",
  subjectIdValidator,
  requestValidation,
  subjectsController.softDeleteSubject
);

/**
 * @swagger
 * /subjects/hard/{id}:
 *   delete:
 *     summary: Hard delete a subject (permanent deletion)
 *     tags: [Subjects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject permanently deleted
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Subject not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subjectsRouter.delete(
  "/hard/:id",
  subjectIdValidator,
  requestValidation,
  subjectsController.hardDeleteSubject
);

export default subjectsRouter;
