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

// GET /concepts
conceptsRouter.get("/", conceptsController.getConcepts);

// GET /concepts/:id
conceptsRouter.get(
  "/:id",
  conceptIdValidator,
  requestValidation,
  conceptsController.getConcept
);

// ADMIN ONLY
conceptsRouter.use(requireAuth);
conceptsRouter.use(requireAdmin);

// POST /concepts
conceptsRouter.post(
  "/",
  addConceptValidator,
  requestValidation,
  conceptsController.postAddConcept
);

// PUT /concepts/:id
conceptsRouter.put(
  "/:id",
  [...conceptIdValidator, ...editConceptValidator],
  requestValidation,
  conceptsController.putEditConcept
);

// DELETE /concepts/:id
conceptsRouter.delete(
  "/:id",
  conceptIdValidator,
  requestValidation,
  conceptsController.deleteConcept
);

export default conceptsRouter;
