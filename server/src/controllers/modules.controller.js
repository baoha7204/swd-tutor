import {
  BadRequestError,
  DatabaseConnectionError,
  NotFoundError,
} from "@bhtickix/common";
import mongoose from "mongoose";

import Module from "../models/module.model.js";
import Subtopic from "../models/subtopic.model.js";

const getModules = async (req, res) => {
  // Get all modules, filter by subtopic if specified
  const subtopicId = req.query.subtopic;

  let filter = {};
  if (subtopicId) {
    filter.subtopic = subtopicId;
  }

  try {
    const modules = await Module.find(filter)
      .populate("subtopic", "id name")
      .sort({ position: 1 });

    res.send(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw new DatabaseConnectionError();
  }
};

const getModule = async (req, res) => {
  const { id } = req.params;

  try {
    const module = await Module.findById(id)
      .populate("subtopic", "id name")
      .populate("excercises", "id name");

    if (!module) {
      throw new NotFoundError("Module not found");
    }

    res.send(module);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error fetching module:", error);
    throw new DatabaseConnectionError();
  }
};

const postAddModule = async (req, res) => {
  const {
    name,
    position,
    moduleType,
    xpReward,
    difficultyLevel,
    estimatedMinutes,
    subtopicId,
  } = req.body;

  try {
    const module = new Module({
      name,
      position,
      moduleType,
      xpReward,
      difficultyLevel,
      estimatedMinutes,
      subtopic: subtopicId,
    });

    await module.save();

    // Update subtopic to include this module
    await Subtopic.findByIdAndUpdate(subtopicId, {
      $push: { modules: module._id },
    });

    res.status(201).send(module);
  } catch (error) {
    console.error("Error creating module:", error);
    throw new DatabaseConnectionError();
  }
};

const putEditModule = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    position,
    moduleType,
    xpReward,
    difficultyLevel,
    estimatedMinutes,
    subtopicId,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const module = await Module.findById(id);

    if (!module) {
      throw new NotFoundError("Module not found");
    }

    // Check if name is being changed and if it already exists
    if (name && name !== module.name) {
      const existingModule = await Module.findOne({ name });
      if (existingModule && existingModule.id !== id) {
        throw new BadRequestError("Module with this name already exists");
      }
      module.name = name;
    }

    // If subtopic is changing, update both old and new subtopic
    if (subtopicId && module.subtopic.toString() !== subtopicId) {
      // Remove module from old subtopic
      await Subtopic.findByIdAndUpdate(
        module.subtopic,
        { $pull: { modules: module._id } },
        { session }
      );

      // Add module to new subtopic
      await Subtopic.findByIdAndUpdate(
        subtopicId,
        { $push: { modules: module._id } },
        { session }
      );

      module.subtopic = subtopicId;
    }

    // Update other fields if provided
    if (position !== undefined) module.position = position;
    if (moduleType !== undefined) module.moduleType = moduleType;
    if (xpReward !== undefined) module.xpReward = xpReward;
    if (difficultyLevel !== undefined) module.difficultyLevel = difficultyLevel;
    if (estimatedMinutes !== undefined)
      module.estimatedMinutes = estimatedMinutes;

    await module.save({ session });
    await session.commitTransaction();

    res.send(module);
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error updating module:", error);
    throw new DatabaseConnectionError();
  } finally {
    session.endSession();
  }
};

const deleteModule = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const module = await Module.findById(id);

    if (!module) {
      throw new NotFoundError("Module not found");
    }

    // Check if module has exercises
    if (module.excercises && module.excercises.length > 0) {
      throw new BadRequestError("Cannot delete module with existing exercises");
    }

    // Remove reference from subtopic
    await Subtopic.findByIdAndUpdate(
      module.subtopic,
      { $pull: { modules: module._id } },
      { session }
    );

    await Module.findByIdAndDelete(id, { session });
    await session.commitTransaction();

    res.status(204).send();
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error deleting module:", error);
    throw new DatabaseConnectionError();
  } finally {
    session.endSession();
  }
};

export default {
  getModules,
  getModule,
  postAddModule,
  putEditModule,
  deleteModule,
};
