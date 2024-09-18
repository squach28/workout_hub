import request from "supertest";
import { createServer } from "../utils/server";
import { db } from "../utils/db";
const app = createServer();

describe("auth", () => {
  describe("post signUp route", () => {
    afterEach(() => {
      db.query("DELETE FROM auth");
    });
    describe("given user does not exist", () => {
      it("should return a 201", async () => {
        const user = {
          email: "bob@gmail.com",
          password: "password123",
        };
        const { statusCode, body } = await request(app)
          .post("/auth/signUp")
          .send(user);

        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("uuid");
        expect(body).toHaveProperty("email", user.email);
      });
    });
    describe("given user does exist", () => {
      it("should return a 400", async () => {
        const user = {
          email: "bob@gmail.com",
          password: "password123",
        };
        await request(app).post("/auth/signUp").send(user);
        const { statusCode, body } = await request(app)
          .post("/auth/signUp")
          .send(user);
        expect(statusCode).toBe(400);
      });
    });
  });
});
