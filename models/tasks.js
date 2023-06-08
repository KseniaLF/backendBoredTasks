const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    activity: {
      type: String,
      required: [true, "Set name for contact"],
    },
    type: {
      type: String,
      required: [true, "Set name for contact"],
    },
    accessibility: {
      type: Number,
    },
    price: {
      type: Number,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Task = model("task", taskSchema);

module.exports = Task;
