import { Response, Request } from "express";

import { SignUpInterface, LoginInterface } from "../interfaces/userInterface";
import * as usersService from "../services/usersServices";

export async function signup(req: Request, res: Response) {
    try{
        const { username, email, password, confirmPassword } = req.body as SignUpInterface;

        const createUser = await usersService.newUser(username, email, password, confirmPassword);
        if (typeof createUser === "object") return res.status(400).send(createUser);
        if (createUser === null) return res.status(409).send("User or email already registered");
        
        return res.status(201).send(createUser);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function login(req: Request, res: Response) {
    try{
        const { username, password } = req.body as LoginInterface;

        const login = await usersService.login(username, password);
        if (login === false) return res.status(404).send("User not found");
        if (login === "invalid") return res.status(400).send("Invalid data");

        return res.status(200).send(login);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function logout(req: Request, res: Response) {
    try{
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
        if (!token) return res.sendStatus(401);

        const logout = await usersService.logout(token);
        if (!logout) return res.sendStatus(503);

        return res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}