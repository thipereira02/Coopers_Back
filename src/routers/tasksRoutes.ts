import express from "express";

import * as tasksController from "../controllers/tasksController";

const router = express.Router();

router.post("/tasks", tasksController.addTask);
router.get("/tasks", tasksController.getTasks);
router.delete("/tasks/:id", tasksController.deleteTask);
router.post("/deleteAll", tasksController.deleteAllTasks);
router.post("/updateTaskType/:id", tasksController.updateTaskType);
router.post("/updateTaskDescription/:id", tasksController.updateTaskDescription);

export default router;