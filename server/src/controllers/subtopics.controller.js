import { BadRequestError, DatabaseConnectionError } from "@bhtickix/common";
import mongoose from "mongoose";

import Subtopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";

const getSubtopics = async (req, res) => {
  // Get all subtopics, filter by topic if specified
  const topicId = req.query.topic;

  let filter = {};
  if (topicId) {
    filter.topic = topicId;
  }

  const subtopics = await Subtopic.find(filter);
  res.send(subtopics);
};

const getSubtopic = async (req, res) => {
  const { id } = req.params;
  const subtopic = await Subtopic.findById(id);
  res.send(subtopic);
};

const postAddSubtopic = async (req, res) => {
  const { name, position, difficultyScore, estimatedStudyMinutes, topicId } =
    req.body;

  try {
    const subtopic = new Subtopic({
      name,
      position,
      difficultyScore,
      estimatedStudyMinutes,
      topic: topicId,
    });

    await subtopic.save();

    // Update topic to include this subtopic
    await Topic.findByIdAndUpdate(topicId, {
      $push: { subtopics: subtopic._id },
    });

    res.status(201).send(subtopic);
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

const putEditSubtopic = async (req, res) => {
  const { id } = req.params;
  const { name, position, difficultyScore, estimatedStudyMinutes, topicId } =
    req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subtopic = await Subtopic.findById(id);

    // Check if name is being changed and if it already exists
    if (name !== subtopic.name) {
      const existingSubtopic = await Subtopic.findOne({ name });
      if (existingSubtopic) {
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

    await subtopic.save({ session });
    await session.commitTransaction();

    res.send(subtopic);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteSubtopic = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subtopic = await Subtopic.findById(id);

    if (!subtopic) {
      throw new BadRequestError("Subtopic not found");
    }

    if (subtopic.modules?.length > 0 || subtopic.concepts?.length > 0) {
      throw new BadRequestError("Cannot delete subtopic with existing content");
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
    throw error;
  } finally {
    session.endSession();
  }
};

export default {
  getSubtopics,
  getSubtopic,
  postAddSubtopic,
  putEditSubtopic,
  deleteSubtopic,
};
