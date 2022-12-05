import connection from "../../database";
import { agent } from "../utils/database";

export async function createUser(){
    const body = {
        username: "user",
        email: "user@test.com",
        password: "123456",
        confirmPassword: "123456"
    };
    await agent.post("/signup").send(body);
}