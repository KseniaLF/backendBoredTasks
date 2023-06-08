const { HttpError } = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const { taskAddSchema } = require("../schemas/task");
const Task = require("../models/tasks");

const getAllTasks = async (req, res, next) => {
  const list = await Task.find();
  res.status(200).json(list);
};

const addOneTask = async (req, res, next) => {
  const { error } = taskAddSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }

  const newContact = await Task.create(req.body);

  res.status(201).json(newContact);
};

module.exports = {
  getAllTasks: ctrlWrapper(getAllTasks),
  addOneTask: ctrlWrapper(addOneTask),
};
