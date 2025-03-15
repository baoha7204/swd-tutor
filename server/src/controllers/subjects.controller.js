import { BadRequestError } from "@bhtickix/common";
import mongoose from "mongoose";

import Subject from "../models/subject.model.js";
import Topic from "../models/topic.model.js";

const getSubjects = async (req, res) => {
  // Get all subjects, active ones by default
  const onlyActive = req.query.active !== "false";
  const includeTopics = req.query.includeTopics === "true";
  const filter = onlyActive ? { isActive: true } : {};

  let query = Subject.find(filter);

  if (includeTopics) {
    query = query.populate({
      path: "topics",
      select: "id name position difficultyRange estimatedStudyHours isActive",
      match: onlyActive ? { isActive: true } : {},
    });
  }

  const subjects = await query;
  res.send(subjects);
};

const getSubject = async (req, res) => {
  const { id } = req.params;
  const onlyActive = req.query.active !== "false";

  const subject = await Subject.findById(id).populate({
    path: "topics",
    select: "id name position difficultyRange estimatedStudyHours isActive",
    match: onlyActive ? { isActive: true } : {},
    options: { sort: { position: 1 } },
  });

  res.send(subject);
};

const postAddSubject = async (req, res) => {
  const { name, iconUrl, description, isActive } = req.body;

  const subject = new Subject({
    name,
    iconUrl,
    description,
  });

  if (isActive) subject.isActive = isActive;

  await subject.save();
  res.status(201).send(subject);
};

const putEditSubject = async (req, res) => {
  const { id } = req.params;
  const { name, iconUrl, description, isActive } = req.body;

  const subject = await Subject.findById(id);
  // Check if name is being changed and if it already exists
  if (name !== subject.name) {
    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) {
      throw new BadRequestError("Subject with this name already exists");
    }
  }

  subject.name = name;
  subject.iconUrl = iconUrl;
  subject.description = description;

  if (isActive) {
    subject.isActive = isActive;
  }

  await subject.save();
  res.send(subject);
};

const softDeleteSubject = async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById(id);

  subject.isActive = false;
  await subject.save();

  res.send(subject);
};

const hardDeleteSubject = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if there are any topics associated with this subject
    const topicsCount = await Topic.countDocuments({ subject: id });

    if (topicsCount > 0) {
      throw new BadRequestError("Cannot delete subject with existing topics");
    }

    await Subject.findByIdAndDelete(id, { session });
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
  getSubjects,
  getSubject,
  postAddSubject,
  putEditSubject,
  softDeleteSubject,
  hardDeleteSubject,
};
