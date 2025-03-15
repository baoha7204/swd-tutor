import { BadRequestError, DatabaseConnectionError } from "@bhtickix/common";
import mongoose from "mongoose";

import Topic from "../models/topic.model.js";
import Subject from "../models/subject.model.js";

const getTopics = async (req, res) => {
  // Get all topics, active ones by default
  const onlyActive = req.query.active !== "false";
  const subjectId = req.query.subject;

  let filter = onlyActive ? { isActive: true } : {};
  if (subjectId) {
    filter.subject = subjectId;
  }

  const topics = await Topic.find(filter).populate("subject", "name iconUrl");
  res.send(topics);
};

const getTopic = async (req, res) => {
  const { id } = req.params;

  const topic = await Topic.findById(id).populate("subject", "name iconUrl");

  res.send(topic);
};

const postAddTopic = async (req, res) => {
  const {
    name,
    position,
    difficultyRange,
    estimatedStudyHours,
    isActive,
    subjectId,
  } = req.body;

  try {
    const topic = new Topic({
      name,
      position,
      difficultyRange,
      estimatedStudyHours,
      subject: subjectId,
    });

    if (isActive) topic.isActive = isActive;

    await topic.save();

    // Update subject to include this topic
    const subject = await Subject.findById(subjectId);
    subject.topics.push(topic._id);
    await subject.save();
    res.status(201).send(topic);
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

const putEditTopic = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    position,
    difficultyRange,
    estimatedStudyHours,
    isActive,
    subjectId,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const topic = await Topic.findById(id);

    // Check if name is being changed and if it already exists
    if (name !== topic.name) {
      const existingTopic = await Topic.findOne({ name });
      if (existingTopic) {
        throw new BadRequestError("Topic with this name already exists");
      }
    }

    // If subject is changing, update both old and new subject
    if (subjectId && topic.subject.toString() !== subjectId) {
      // Remove topic from old subject
      await Subject.findByIdAndUpdate(
        topic.subject,
        { $pull: { topics: topic._id } },
        { session }
      );

      // Add topic to new subject
      await Subject.findByIdAndUpdate(
        subjectId,
        { $push: { topics: topic._id } },
        { session }
      );

      topic.subject = subjectId;
    }

    topic.name = name;
    topic.position = position;
    topic.difficultyRange = difficultyRange;
    topic.estimatedStudyHours = estimatedStudyHours;

    if (isActive) {
      topic.isActive = isActive;
    }

    await topic.save({ session });
    await session.commitTransaction();

    res.send(topic);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const softDeleteTopic = async (req, res) => {
  const { id } = req.params;

  const topic = await Topic.findById(id);

  topic.isActive = false;
  await topic.save();

  res.send(topic);
};

const hardDeleteTopic = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const topic = await Topic.findById(id);

    if (topic.subtopics.length > 0) {
      throw new BadRequestError("Cannot delete topic with existing subtopics");
    }

    // Remove reference from subject
    await Subject.findByIdAndUpdate(
      topic.subject,
      { $pull: { topics: topic._id } },
      { session }
    );

    await Topic.findByIdAndDelete(id, { session });
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
  getTopics,
  getTopic,
  postAddTopic,
  putEditTopic,
  softDeleteTopic,
  hardDeleteTopic,
};
