import bcrypt from "bcrypt";
import casual from "casual";

import * as usersRepository from "../repositories/usersRepository";
import { signUpSchema, loginSchema } from "../schemas/UserSchema";

export async function newUser(username: string, email: string, password: string, confirmPassword: string) {
    const isValid = signUpSchema.validate({ username, email, password, confirmPassword });
    if (isValid.error !== undefined) {
        let message = "";
        switch (isValid.error.details[0].type) {
            case "string.min":
                message = "User must be at least 3 characters";
                break;
            case "string.email":
                message = "Invalid email format";
                break;
            case "string.pattern.base":
                message = "The password must be at least 8 characters long, consisting of an uppercase letter, a lowercase letter, a number and a special character";
                break;
            case "any.only":
                message = "Passwords do not match";
                break;
            default:
                message = "Invalid data";
                break;
        } 
        return {message};
    }

    const userIsAvailable = await usersRepository.userIsAvailable(username);
    if (userIsAvailable === false) return null;

    const emailIsAvailable = await usersRepository.emailIsAvailable(email);
    if (emailIsAvailable === false) return null;

    const token = casual.uuid;
    const hash = bcrypt.hashSync(password, 12);

    const userToken = await usersRepository.newUser(username, email, token, hash);
    return userToken;
}

export async function login(username: string, password: string) {

    const isValid = loginSchema.validate({ username, password });
    if (isValid.error !== undefined) return "invalid";

    const userExists = await usersRepository.userExists(username);
    if (userExists === false) return false;

    const isPasswordCorrect = bcrypt.compareSync(password, userExists.password);
    if (isPasswordCorrect === false) return false;
    const token = casual.uuid;

    const newSession = await usersRepository.newSession(userExists.id, token);
    return newSession;
}

export async function logout(token: string) {
    const finishSession = await usersRepository.finishSession(token);
    return finishSession;
}