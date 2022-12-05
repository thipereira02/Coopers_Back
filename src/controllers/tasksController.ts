import { Response, Request } from "express";

import { TaskInterface } from "../interfaces/taskInterface";
import * as tasksService from "../services/tasksServices";

export async function addTask(req: Request, res: Response) {
    try{
        const { description, taskType } = req.body as TaskInterface;
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        if (!token) return res.sendStatus(401);

        const addTask = await tasksService.addTask(description, taskType, token);
        if (addTask === false) return res.sendStatus(400);

        return res.status(201).send(addTask);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getTasks(req: Request, res: Response) {
    try{
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        if (!token) return res.sendStatus(401);

        const tasks = await tasksService.getTasks(token);

        return res.send(tasks);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteTask(req: Request, res: Response) {
    try{
        const authorization = req.header("Authorization");
        const taskId = Number(req.params.id);
        const token = authorization?.replace("Bearer ", "");

        if (!token) return res.sendStatus(401);

        const task = await tasksService.deleteTask(taskId, token);
        if (task === false) return res.sendStatus(404);

        return res.sendStatus(200);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteAllTasks(req: Request, res: Response) {
    try{
        const { taskType } = req.body as TaskInterface;
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        if (!token) return res.sendStatus(401);

        await tasksService.deleteAllTasks(taskType, token);

        return res.sendStatus(200);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updateTaskType(req: Request, res: Response) {
    try{
        const taskId = Number(req.params.id);
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        if (!token) return res.sendStatus(401);

        await tasksService.updateTaskType(taskId, token);

        return res.sendStatus(200);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updateTaskDescription(req: Request, res: Response) {
    try{
        const { description } = req.body as TaskInterface;
        const taskId = Number(req.params.id);
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        if (!token) return res.sendStatus(401);

        const updateTask = await tasksService.updateTaskDescription(description, taskId, token);
        if (updateTask === false) return res.sendStatus(400);

        return res.status(200).send(updateTask);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}