import { Router } from "express";
import { requestValidation, requireAuth } from "@bhtickix/common";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";
import formulasController from "../controllers/formulas.controller.js";
import {
  addFormulaValidator,
  editFormulaValidator,
  formulaIdValidator,
} from "../validators/formulas.validator.js";

const formulasRouter = Router();

/**
 * @swagger
 * /formulas:
 *   get:
 *     summary: Get all formulas
 *     tags: [Formulas]
 *     responses:
 *       200:
 *         description: List of all formulas
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
 *                   expression:
 *                     type: string
 *                   description:
 *                     type: string
 */
formulasRouter.get("/", formulasController.getFormulas);

/**
 * @swagger
 * /formulas/{id}:
 *   get:
 *     summary: Get a specific formula by ID
 *     tags: [Formulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Formula ID
 *     responses:
 *       200:
 *         description: Formula details
 *       404:
 *         description: Formula not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
formulasRouter.get(
  "/:id",
  formulaIdValidator,
  requestValidation,
  formulasController.getFormula
);

// ADMIN ONLY routes
formulasRouter.use(requireAuth);
formulasRouter.use(requireAdmin);

/**
 * @swagger
 * /formulas:
 *   post:
 *     summary: Create a new formula
 *     tags: [Formulas]
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
 *               - expression
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the formula
 *               expression:
 *                 type: string
 *                 description: Mathematical expression of the formula
 *               description:
 *                 type: string
 *                 description: Description of the formula
 *               variables:
 *                 type: array
 *                 description: Variables used in the formula
 *                 items:
 *                   type: object
 *                   properties:
 *                     symbol:
 *                       type: string
 *                     name:
 *                       type: string
 *                     unit:
 *                       type: string
 *     responses:
 *       201:
 *         description: Formula created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
formulasRouter.post(
  "/",
  addFormulaValidator,
  requestValidation,
  formulasController.postAddFormula
);

/**
 * @swagger
 * /formulas/{id}:
 *   put:
 *     summary: Update a formula
 *     tags: [Formulas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Formula ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the formula
 *               expression:
 *                 type: string
 *                 description: Mathematical expression of the formula
 *               description:
 *                 type: string
 *                 description: Description of the formula
 *               variables:
 *                 type: array
 *                 description: Variables used in the formula
 *                 items:
 *                   type: object
 *                   properties:
 *                     symbol:
 *                       type: string
 *                     name:
 *                       type: string
 *                     unit:
 *                       type: string
 *     responses:
 *       200:
 *         description: Formula updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Formula not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
formulasRouter.put(
  "/:id",
  [...formulaIdValidator, ...editFormulaValidator],
  requestValidation,
  formulasController.putEditFormula
);

/**
 * @swagger
 * /formulas/{id}:
 *   delete:
 *     summary: Delete a formula
 *     tags: [Formulas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Formula ID
 *     responses:
 *       200:
 *         description: Formula deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Formula not found
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
formulasRouter.delete(
  "/:id",
  formulaIdValidator,
  requestValidation,
  formulasController.deleteFormula
);

export default formulasRouter;
