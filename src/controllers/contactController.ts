import { Response, Request } from "express";

import { ContactInterface } from "../interfaces/contactInterface";
import * as contactService from "../services/contactServices";

export async function saveMessage(req: Request, res: Response) {
    try{
        const { name, email, telephone, text } = req.body as ContactInterface;

        const saveMessage = await contactService.saveMessage(name, email, telephone, text);
        if (saveMessage === false) return res.sendStatus(400);

        return res.status(201).send(saveMessage);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}