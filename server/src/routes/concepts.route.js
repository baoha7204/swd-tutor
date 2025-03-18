import { Router } from "express";
import { requestValidation, requireAuth } from "@bhtickix/common";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";
import conceptsController from "../controllers/concepts.controller.js";
import {
  addConceptValidator,
  editConceptValidator,
  conceptIdValidator,
} from "../validators/concepts.validator.js";

const conceptsRouter = Router();

/**
 * @swagger
 * /concepts:
 *   get:
 *     summary: Get all concepts
 *     tags: [Concepts]
 *     responses:
 *       200:
 *         description: List of all concepts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
conceptsRouter.get("/", conceptsController.getConcepts);

/**
 * @swagger
 * /concepts/{id}:
 *   get:
 *     summary: Get a specific concept by ID
 *     tags: [Concepts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Concept ID
 *     responses:
 *       200:
 *         description: Concept details
 *       404:
 *         description: Concept not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
conceptsRouter.get(
  "/:id",
  conceptIdValidator,
  requestValidation,
  conceptsController.getConcept
);

// ADMIN ONLY
conceptsRouter.use(requireAuth);
conceptsRouter.use(requireAdmin);

/**
 * @swagger
 * /concepts:
 *   post:
 *     summary: Create a new concept
 *     tags: [Concepts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Concept created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
conceptsRouter.post(
  "/",
  addConceptValidator,
  requestValidation,
  conceptsController.postAddConcept
);

/**
 * @swagger
 * /concepts/{id}:
 *   put:
 *     summary: Update a concept
 *     tags: [Concepts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Concept ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Concept updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Concept not found
 */
conceptsRouter.put(
  "/:id",
  [...conceptIdValidator, ...editConceptValidator],
  requestValidation,
  conceptsController.putEditConcept
);

/**
 * @swagger
 * /concepts/{id}:
 *   delete:
 *     summary: Delete a concept
 *     tags: [Concepts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Concept ID
 *     responses:
 *       200:
 *         description: Concept deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Concept not found
 */
conceptsRouter.delete(
  "/:id",
  conceptIdValidator,
  requestValidation,
  conceptsController.deleteConcept
);

export default conceptsRouter;
