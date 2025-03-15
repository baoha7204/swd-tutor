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

// GET /formulas
formulasRouter.get("/", formulasController.getFormulas);

// GET /formulas/:id
formulasRouter.get(
  "/:id",
  formulaIdValidator,
  requestValidation,
  formulasController.getFormula
);

// ADMIN ONLY routes
formulasRouter.use(requireAuth);
formulasRouter.use(requireAdmin);

// POST /formulas
formulasRouter.post(
  "/",
  addFormulaValidator,
  requestValidation,
  formulasController.postAddFormula
);

// PUT /formulas/:id
formulasRouter.put(
  "/:id",
  [...formulaIdValidator, ...editFormulaValidator],
  requestValidation,
  formulasController.putEditFormula
);

// DELETE /formulas/:id
formulasRouter.delete(
  "/:id",
  formulaIdValidator,
  requestValidation,
  formulasController.deleteFormula
);

export default formulasRouter;
