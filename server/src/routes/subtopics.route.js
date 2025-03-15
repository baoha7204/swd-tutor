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

// GET /subtopics
subtopicsRouter.get("/", subtopicsController.getSubtopics);

// GET /subtopics/:id
subtopicsRouter.get(
  "/:id",
  subtopicIdValidator,
  requestValidation,
  subtopicsController.getSubtopic
);

// ADMIN ONLY
subtopicsRouter.use(requireAuth);
subtopicsRouter.use(requireAdmin);

// POST /subtopics
subtopicsRouter.post(
  "/",
  addSubtopicValidator,
  requestValidation,
  subtopicsController.postAddSubtopic
);

// PUT /subtopics/:id
subtopicsRouter.put(
  "/:id",
  [...subtopicIdValidator, ...editSubtopicValidator],
  requestValidation,
  subtopicsController.putEditSubtopic
);

// DELETE /subtopics/soft/:id
subtopicsRouter.delete(
  "/soft/:id",
  subtopicIdValidator,
  requestValidation,
  subtopicsController.softDeleteSubtopic
);

// DELETE /subtopics/hard/:id
subtopicsRouter.delete(
  "/hard/:id",
  subtopicIdValidator,
  requestValidation,
  subtopicsController.hardDeleteSubtopic
);

export default subtopicsRouter;
