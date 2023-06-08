const { HttpError } = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const { taskAddSchema } = require("../schemas/task");
const Task = require("../models/tasks");

const getAllTasks = async (req, res, next) => {
  const { resolved } = req.query;
  let list;

  if (resolved) {
    list = await Task.find({ resolved });
  } else list = await Task.find();

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

const updateResolvedStatus = async (req, res, next) => {
  const updatedContact = await Task.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const getAchievements = async (req, res, next) => {
  const list = await Task.find({}, "price type");

  const pricesByType = {};

  list.forEach((task) => {
    const { type, price } = task;
    if (pricesByType[type]) {
      pricesByType[type] += price;
    } else {
      pricesByType[type] = price;
    }
  });

  const result = Object.entries(pricesByType).map(([type, price]) => ({
    type,
    price: Math.round(price * 10),
  }));

  res.status(200).json(result);
};

module.exports = {
  getAllTasks: ctrlWrapper(getAllTasks),
  addOneTask: ctrlWrapper(addOneTask),
  updateResolvedStatus: ctrlWrapper(updateResolvedStatus),
  getAchievements: ctrlWrapper(getAchievements),
};
