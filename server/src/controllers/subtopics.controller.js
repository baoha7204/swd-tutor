import {
  BadRequestError,
  DatabaseConnectionError,
  NotFoundError,
} from "@bhtickix/common";
import mongoose from "mongoose";

import Subtopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";

const getSubtopics = async (req, res) => {
  // Get all subtopics, filter by topic if specified
  const topicId = req.query.topic;
  const onlyActive = req.query.active !== "false";

  let filter = {};
  if (topicId) {
    filter.topic = topicId;
  }
  if (onlyActive) {
    filter.isActive = true;
  }

  try {
    const subtopics = await Subtopic.find(filter)
      .populate("topic", "id name")
      .sort({ position: 1 });

    res.send(subtopics);
  } catch (error) {
    console.error("Error fetching subtopics:", error);
    throw new DatabaseConnectionError();
  }
};

const getSubtopic = async (req, res) => {
  const { id } = req.params;

  try {
    const subtopic = await Subtopic.findById(id)
      .populate("topic", "id name position")
      .populate("concepts", "id name symbolNotation")
      .populate("modules", "id name moduleType position");

    if (!subtopic) {
      throw new NotFoundError("Subtopic not found");
    }

    res.send(subtopic);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error fetching subtopic:", error);
    throw new DatabaseConnectionError();
  }
};

const postAddSubtopic = async (req, res) => {
  const {
    name,
    position,
    difficultyScore,
    estimatedStudyMinutes,
    topicId,
    isActive,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subtopic = new Subtopic({
      name,
      position,
      difficultyScore,
      estimatedStudyMinutes,
      topic: topicId,
    });

    if (isActive !== undefined) {
      subtopic.isActive = isActive;
    }

    await subtopic.save({ session });

    // Update topic to include this subtopic
    await Topic.findByIdAndUpdate(
      topicId,
      { $push: { subtopics: subtopic._id } },
      { session }
    );

    await session.commitTransaction();
    res.status(201).send(subtopic);
  } catch (error) {
    await session.abortTransaction();
    console.error("Error creating subtopic:", error);
    throw new DatabaseConnectionError();
  } finally {
    session.endSession();
  }
};

const putEditSubtopic = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    position,
    difficultyScore,
    estimatedStudyMinutes,
    topicId,
    isActive,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subtopic = await Subtopic.findById(id);

    if (!subtopic) {
      throw new NotFoundError("Subtopic not found");
    }

    // Check if name is being changed and if it already exists
    if (name !== subtopic.name) {
      const existingSubtopic = await Subtopic.findOne({ name });
      if (existingSubtopic && existingSubtopic.id !== id) {
        throw new BadRequestError("Subtopic with this name already exists");
      }
    }

    // If topic is changing, update both old and new topic
    if (topicId && subtopic.topic.toString() !== topicId) {
      // Remove subtopic from old topic
      await Topic.findByIdAndUpdate(
        subtopic.topic,
        { $pull: { subtopics: subtopic._id } },
        { session }
      );

      // Add subtopic to new topic
      await Topic.findByIdAndUpdate(
        topicId,
        { $push: { subtopics: subtopic._id } },
        { session }
      );

      subtopic.topic = topicId;
    }

    subtopic.name = name;
    subtopic.position = position;
    subtopic.difficultyScore = difficultyScore;
    subtopic.estimatedStudyMinutes = estimatedStudyMinutes;

    if (isActive !== undefined) {
      subtopic.isActive = isActive;
    }

    await subtopic.save({ session });
    await session.commitTransaction();

    res.send(subtopic);
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error updating subtopic:", error);
    throw new DatabaseConnectionError();
  } finally {
    session.endSession();
  }
};

const softDeleteSubtopic = async (req, res) => {
  const { id } = req.params;

  try {
    const subtopic = await Subtopic.findById(id);

    if (!subtopic) {
      throw new NotFoundError("Subtopic not found");
    }

    subtopic.isActive = false;
    await subtopic.save();

    res.send(subtopic);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error soft deleting subtopic:", error);
    throw new DatabaseConnectionError();
  }
};

const hardDeleteSubtopic = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subtopic = await Subtopic.findById(id);

    if (!subtopic) {
      throw new NotFoundError("Subtopic not found");
    }

    if (subtopic.modules?.length > 0 || subtopic.concepts?.length > 0) {
      throw new BadRequestError(
        "Cannot delete subtopic with existing modules or concepts"
      );
    }

    // Remove reference from topic
    await Topic.findByIdAndUpdate(
      subtopic.topic,
      { $pull: { subtopics: subtopic._id } },
      { session }
    );

    await Subtopic.findByIdAndDelete(id, { session });
    await session.commitTransaction();

    res.status(204).send({});
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error hard deleting subtopic:", error);
    throw new DatabaseConnectionError();
  } finally {
    session.endSession();
  }
};

export default {
  getSubtopics,
  getSubtopic,
  postAddSubtopic,
  putEditSubtopic,
  softDeleteSubtopic,
  hardDeleteSubtopic,
};
