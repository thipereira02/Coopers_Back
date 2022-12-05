import { taskSchema, updateTaskSchema } from "../schemas/TaskSchema";

import * as tasksRepository from "../repositories/tasksRepository";

export async function addTask(description: string, taskType: string, token: string) {
    const isValid = taskSchema.validate({ description, taskType });
    if (isValid.error !== undefined) return false;

    const getUserId = await tasksRepository.getUserId(token);

    await tasksRepository.addTask(description, taskType, getUserId.userId);
    return "Task added successfully";
}

export async function getTasks(token: string) {
    const getUserId = await tasksRepository.getUserId(token);

    const tasks = await tasksRepository.getTasks(getUserId.userId);
    return tasks;
}

export async function deleteTask(taskId: number, token: string) {
    const getUserId = await tasksRepository.getUserId(token);

    const task = await tasksRepository.deleteTask(taskId, getUserId.userId);
    if (task === false) return false;

    return true;
}

export async function deleteAllTasks(taskType: string, token: string) {
    const getUserId = await tasksRepository.getUserId(token);

    await tasksRepository.deleteAllTasks(getUserId.userId, taskType);
}

export async function updateTaskType(taskId: number, token: string) {
    const getUserId = await tasksRepository.getUserId(token);

    await tasksRepository.updateTaskType(getUserId.userId, taskId);
}

export async function updateTaskDescription(description: string, taskId: number, token: string) {
    const isValid = updateTaskSchema.validate({ description });
    if (isValid.error !== undefined) return false;

    const getUserId = await tasksRepository.getUserId(token);

    await tasksRepository.updateTaskDescription(getUserId.userId, taskId, description);
    return "Task description updated successfully";
}