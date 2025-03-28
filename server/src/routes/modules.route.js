import express from "express";
import { requireAuth, requestValidation } from "@bhtickix/common";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";

import modulesController from "../controllers/modules.controller.js";
import modulesValidator from "../validators/modules.validator.js";

const router = express.Router();

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: List of all modules
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
 *                   subtopicId:
 *                     type: string
 */
router.get("/", modulesController.getModules);

/**
 * @swagger
 * /modules/{id}:
 *   get:
 *     summary: Get a specific module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module details
 *       404:
 *         description: Module not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get(
  "/:id",
  modulesValidator.validateModuleId,
  requestValidation,
  modulesController.getModule
);

// Admin only routes
router.use(requireAuth);
router.use(requireAdmin);

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
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
 *               - subtopicId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the module
 *               description:
 *                 type: string
 *                 description: Description of the module
 *               subtopicId:
 *                 type: string
 *                 description: ID of the subtopic this module belongs to
 *     responses:
 *       201:
 *         description: Module created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
router.post(
  "/",
  modulesValidator.validateModuleCreate,
  requestValidation,
  modulesController.postAddModule
);

/**
 * @swagger
 * /modules/{id}:
 *   put:
 *     summary: Update a module
 *     tags: [Modules]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the module
 *               description:
 *                 type: string
 *                 description: Description of the module
 *               subtopicId:
 *                 type: string
 *                 description: ID of the subtopic this module belongs to
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Module not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
router.put(
  "/:id",
  modulesValidator.validateModuleUpdate,
  requestValidation,
  modulesController.putEditModule
);

/**
 * @swagger
 * /modules/{id}:
 *   delete:
 *     summary: Delete a module
 *     tags: [Modules]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Module not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete(
  "/:id",
  modulesValidator.validateModuleId,
  requestValidation,
  modulesController.deleteModule
);

export default router;
