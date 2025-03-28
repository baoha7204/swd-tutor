import { Router } from "express";
import { requestValidation, requireAuth } from "@bhtickix/common";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";
import topicsController from "../controllers/topics.controller.js";
import {
  addTopicValidator,
  editTopicValidator,
  topicIdValidator,
} from "../validators/topics.validator.js";

const topicsRouter = Router();

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: List of all topics
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
 *                   subjectId:
 *                     type: string
 *                   isDeleted:
 *                     type: boolean
 */
topicsRouter.get("/", topicsController.getTopics);

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     summary: Get a specific topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic details
 *       404:
 *         description: Topic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
topicsRouter.get(
  "/:id",
  topicIdValidator,
  requestValidation,
  topicsController.getTopic
);

// ADMIN ONLY
topicsRouter.use(requireAuth);
topicsRouter.use(requireAdmin);

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topics]
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
 *               - subjectId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the topic
 *               description:
 *                 type: string
 *                 description: Description of the topic
 *               subjectId:
 *                 type: string
 *                 description: ID of the subject this topic belongs to
 *     responses:
 *       201:
 *         description: Topic created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
topicsRouter.post(
  "/",
  addTopicValidator,
  requestValidation,
  topicsController.postAddTopic
);

/**
 * @swagger
 * /topics/{id}:
 *   put:
 *     summary: Update a topic
 *     tags: [Topics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the topic
 *               description:
 *                 type: string
 *                 description: Description of the topic
 *               subjectId:
 *                 type: string
 *                 description: ID of the subject this topic belongs to
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Topic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
topicsRouter.put(
  "/:id",
  [...topicIdValidator, ...editTopicValidator],
  requestValidation,
  topicsController.putEditTopic
);

/**
 * @swagger
 * /topics/soft/{id}:
 *   delete:
 *     summary: Soft delete a topic
 *     tags: [Topics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic soft deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Topic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
topicsRouter.delete(
  "/soft/:id",
  topicIdValidator,
  requestValidation,
  topicsController.softDeleteTopic
);

/**
 * @swagger
 * /topics/hard/{id}:
 *   delete:
 *     summary: Hard delete a topic (permanent deletion)
 *     tags: [Topics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic permanently deleted
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Topic not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
topicsRouter.delete(
  "/hard/:id",
  topicIdValidator,
  requestValidation,
  topicsController.hardDeleteTopic
);

export default topicsRouter;
