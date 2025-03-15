import express from "express";
import { requireAuth, requestValidation } from "@bhtickix/common";
import { requireAdmin } from "../middlewares/require-admin.middleware.js";

import modulesController from "../controllers/modules.controller.js";
import modulesValidator from "../validators/modules.validator.js";

const router = express.Router();

// Get all modules
router.get("/", modulesController.getModules);

// Get a specific module
router.get(
  "/:id",
  modulesValidator.validateModuleId,
  requestValidation,
  modulesController.getModule
);

// Admin only routes
router.use(requireAuth);
router.use(requireAdmin);

// Create a new module
router.post(
  "/",
  modulesValidator.validateModuleCreate,
  requestValidation,
  modulesController.postAddModule
);

// Update a module
router.put(
  "/:id",
  modulesValidator.validateModuleUpdate,
  requestValidation,
  modulesController.putEditModule
);

// Delete a module
router.delete(
  "/:id",
  modulesValidator.validateModuleId,
  requestValidation,
  modulesController.deleteModule
);

export default router;
