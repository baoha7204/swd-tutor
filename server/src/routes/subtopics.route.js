import { Router } from "express";
import { requestValidation, requireAuth } from "@bhtickix/common";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";
import subtopicsController from "../controllers/subtopics.controller.js";
import {
  addSubtopicValidator,
  editSubtopicValidator,
  subtopicIdValidator,
} from "../validators/subtopics.validator.js";

const subtopicsRouter = Router();

/**
 * @swagger
 * /subtopics:
 *   get:
 *     summary: Get all subtopics
 *     tags: [Subtopics]
 *     responses:
 *       200:
 *         description: List of all subtopics
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
 *                   topicId:
 *                     type: string
 *                   isDeleted:
 *                     type: boolean
 */
subtopicsRouter.get("/", subtopicsController.getSubtopics);

/**
 * @swagger
 * /subtopics/{id}:
 *   get:
 *     summary: Get a specific subtopic by ID
 *     tags: [Subtopics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtopic ID
 *     responses:
 *       200:
 *         description: Subtopic details
 *       404:
 *         description: Subtopic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subtopicsRouter.get(
  "/:id",
  subtopicIdValidator,
  requestValidation,
  subtopicsController.getSubtopic
);

// ADMIN ONLY
subtopicsRouter.use(requireAuth);
subtopicsRouter.use(requireAdmin);

/**
 * @swagger
 * /subtopics:
 *   post:
 *     summary: Create a new subtopic
 *     tags: [Subtopics]
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
 *               - topicId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the subtopic
 *               description:
 *                 type: string
 *                 description: Description of the subtopic
 *               topicId:
 *                 type: string
 *                 description: ID of the topic this subtopic belongs to
 *     responses:
 *       201:
 *         description: Subtopic created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subtopicsRouter.post(
  "/",
  addSubtopicValidator,
  requestValidation,
  subtopicsController.postAddSubtopic
);

/**
 * @swagger
 * /subtopics/{id}:
 *   put:
 *     summary: Update a subtopic
 *     tags: [Subtopics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtopic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the subtopic
 *               description:
 *                 type: string
 *                 description: Description of the subtopic
 *               topicId:
 *                 type: string
 *                 description: ID of the topic this subtopic belongs to
 *     responses:
 *       200:
 *         description: Subtopic updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Subtopic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subtopicsRouter.put(
  "/:id",
  [...subtopicIdValidator, ...editSubtopicValidator],
  requestValidation,
  subtopicsController.putEditSubtopic
);

/**
 * @swagger
 * /subtopics/soft/{id}:
 *   delete:
 *     summary: Soft delete a subtopic
 *     tags: [Subtopics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtopic ID
 *     responses:
 *       200:
 *         description: Subtopic soft deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Subtopic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subtopicsRouter.delete(
  "/soft/:id",
  subtopicIdValidator,
  requestValidation,
  subtopicsController.softDeleteSubtopic
);

/**
 * @swagger
 * /subtopics/hard/{id}:
 *   delete:
 *     summary: Hard delete a subtopic (permanent deletion)
 *     tags: [Subtopics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtopic ID
 *     responses:
 *       200:
 *         description: Subtopic permanently deleted
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Subtopic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
subtopicsRouter.delete(
  "/hard/:id",
  subtopicIdValidator,
  requestValidation,
  subtopicsController.hardDeleteSubtopic
);

export default subtopicsRouter;
