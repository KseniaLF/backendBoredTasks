const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/task");

router.get("/", tasksController.getAllTasks);

router.post("/", tasksController.addOneTask);

module.exports = router;
