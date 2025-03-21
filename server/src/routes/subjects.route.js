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

// GET /subjects
subjectsRouter.get("/", subjectsController.getSubjects);

// GET /subjects/:id
subjectsRouter.get(
  "/:id",
  subjectIdValidator,
  requestValidation,
  subjectsController.getSubject
);

// ADMIN ONLY
subjectsRouter.use(requireAuth);
subjectsRouter.use(requireAdmin);

// POST /subjects
subjectsRouter.post(
  "/",
  addSubjectValidator,
  requestValidation,
  subjectsController.postAddSubject
);

// PUT /subjects/:id
subjectsRouter.put(
  "/:id",
  [...subjectIdValidator, ...editSubjectValidator],
  requestValidation,
  subjectsController.putEditSubject
);

// DELETE /subjects/soft/:id
subjectsRouter.delete(
  "/soft/:id",
  subjectIdValidator,
  requestValidation,
  subjectsController.softDeleteSubject
);

// DELETE /subjects/hard/:id
subjectsRouter.delete(
  "/hard/:id",
  subjectIdValidator,
  requestValidation,
  subjectsController.hardDeleteSubject
);

export default subjectsRouter;
