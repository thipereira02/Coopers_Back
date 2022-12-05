import { agent, clearDatabase, closeConnection } from "../utils/database";
import { createUser } from "../factories/usersFactory";

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeConnection();
});

describe("POST /signup", () => {
    it("returns 201 when user is created", async () => {
        const body = {
            username: "user",
            email: "user@test.com",
            password: "123456",
            confirmPassword: "123456"
        };
        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(201);
    });
    it("returns 400 when username is missing", async () => {
        const body = {
            username: "",
            email: "user@test.com",
            password: "123456",
            confirmPassword: "123456"
        };
        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(400);
    });
    it("returns 400 when email is missing", async () => {
        const body = {
            username: "user",
            email: "",
            password: "123456",
            confirmPassword: "123456"
        };
        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(400);
    });
    it ("returns 409 when username or email is already taken", async () => {
        const body = {
            username: "user",
            email: "user@test.com",
            password: "123456",
            confirmPassword: "123456"
        };
        await agent.post("/signup").send(body);
        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(409);
    });
});

describe("POST /login", () => {
    it("returns 200 when user is logged in", async () => {
        await createUser();
        const body = {
            username: "user",
            password: "123456",
        };
        const result = await agent.post("/login").send(body);
        expect(result.status).toEqual(200);
    });
    it("returns 400 when username is missing", async () => {
        await createUser();
        const body = {
            username: "",
            password: "123456",
        };
        const result = await agent.post("/login").send(body);
        expect(result.status).toEqual(400);
    });
    it("returns 400 when password is missing", async () => {
        await createUser();
        const body = {
            username: "user",
            password: "",
        };
        const result = await agent.post("/login").send(body);
        expect(result.status).toEqual(400);
    });
    it("returns 404 when user is not found", async () => {
        await createUser();
        const body = {
            username: "user2",
            password: "123456",
        };
        const result = await agent.post("/login").send(body);
        expect(result.status).toEqual(404);
    });
    it("returns 404 when password is incorrect", async () => {
        await createUser();
        const body = {
            username: "user",
            password: "1234567",
        };
        const result = await agent.post("/login").send(body);
        expect(result.status).toEqual(404);
    });
});
describe("POST /logout", () => {
    it("returns 200 when user is logged out", async () => {
        await createUser();
        const body = {
            username: "user",
            password: "123456",
        };
        const userToken = await agent.post("/login").send(body);
        const result = await agent.post("/logout").set("Authorization", `Bearer ${userToken.body.token}`);
        expect(result.status).toEqual(200);
    });
});