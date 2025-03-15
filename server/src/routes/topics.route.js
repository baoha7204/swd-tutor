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

// GET /topics
topicsRouter.get("/", topicsController.getTopics);

// GET /topics/:id
topicsRouter.get(
  "/:id",
  topicIdValidator,
  requestValidation,
  topicsController.getTopic
);

// ADMIN ONLY
topicsRouter.use(requireAuth);
topicsRouter.use(requireAdmin);

// POST /topics
topicsRouter.post(
  "/",
  addTopicValidator,
  requestValidation,
  topicsController.postAddTopic
);

// PUT /topics/:id
topicsRouter.put(
  "/:id",
  [...topicIdValidator, ...editTopicValidator],
  requestValidation,
  topicsController.putEditTopic
);

// DELETE /topics/soft/:id
topicsRouter.delete(
  "/soft/:id",
  topicIdValidator,
  requestValidation,
  topicsController.softDeleteTopic
);

// DELETE /topics/hard/:id
topicsRouter.delete(
  "/hard/:id",
  topicIdValidator,
  requestValidation,
  topicsController.hardDeleteTopic
);

export default topicsRouter;
