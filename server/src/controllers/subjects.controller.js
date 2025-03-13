import { BadRequestError, NotFoundError } from "@bhtickix/common";
import Subject from "../models/subject.model.js";

const getSubjects = async (req, res) => {
  // Get all subjects, active ones by default
  const onlyActive = req.query.active !== "false";
  const filter = onlyActive ? { isActive: true } : {};

  const subjects = await Subject.find(filter);
  res.send(subjects);
};

const getSubject = async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById(id);
  if (!subject) {
    throw new NotFoundError("Subject not found");
  }

  res.send(subject);
};

const postAddSubject = async (req, res) => {
  const { name, iconUrl, description } = req.body;

  // Check if subject already exists
  const existingSubject = await Subject.findOne({ name });
  if (existingSubject) {
    throw new BadRequestError("Subject already exists");
  }

  const subject = new Subject({
    name,
    iconUrl,
    description,
  });

  await subject.save();
  res.status(201).send(subject);
};

const putEditSubject = async (req, res) => {
  const { id } = req.params;
  const { name, iconUrl, description, isActive } = req.body;

  const subject = await Subject.findById(id);
  if (!subject) {
    throw new NotFoundError("Subject not found");
  }

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

// Switch isActive = false
const softDeleteSubject = async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById(id);
  if (!subject) {
    throw new NotFoundError("Subject not found");
  }

  subject.isActive = false;
  await subject.save();

  res.send(subject);
};

// Check if contains topics
const hardDeleteSubject = async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById(id);
  if (!subject) {
    throw new NotFoundError("Subject not found");
  }

  if (subject.topics.length > 0) {
    throw new BadRequestError("Cannot delete subject with existing topics");
  }

  await Subject.findByIdAndDelete(id);
  res.status(204).send({});
};

export default {
  getSubjects,
  getSubject,
  postAddSubject,
  putEditSubject,
  softDeleteSubject,
  hardDeleteSubject,
};
