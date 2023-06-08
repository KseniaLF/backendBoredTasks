const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/task");

router.get("/", tasksController.getAllTasks);

router.post("/", tasksController.addOneTask);

router.patch("/:id/resolved", tasksController.updateResolvedStatus);

router.get("/achievements", tasksController.getAchievements);

module.exports = router;
