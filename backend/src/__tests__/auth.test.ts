import request from "supertest";
import { createServer } from "../utils/server";
import { db } from "../utils/db";
import { getUserByEmail, insertUser } from "../controllers/auth";

const app = createServer();

describe("auth", () => {
  describe("test helper functions in auth", () => {
    beforeEach(async () => {
      await db.query("DELETE FROM auth");
    });

    afterEach(async () => {
      await db.query("DELETE FROM auth");
    });

    describe("given email does not exist", () => {
      it("getUserByEmail should return null", async () => {
        const email = "bob@gmail.com";
        const user = await getUserByEmail(email);
        expect(user).toBe(null);
      });

      it("insertUser should return object", async () => {
        const email = "bob@gmail.com";
        const password = "password123";
        const user = await insertUser(email, password);
        expect(user).toHaveProperty("uuid");
        expect(user).toHaveProperty("email");
      });
    });

    describe("given email does exist", () => {
      it("getUserByEmail should return object", async () => {
        const email = "bob@gmail.com";
        const password = "password123";
        await insertUser(email, password);
        const user = await getUserByEmail(email);
        expect(user).toHaveProperty("uuid");
        expect(user).toHaveProperty("email", email);
      });

      it("insertUser should return null", async () => {
        const email = "bob@gmail.com";
        const password = "password123";
        await insertUser(email, password);
        const user = await insertUser(email, password);
        expect(user).toBe(null);
      });
    });
  });

  describe("post signUp route", () => {
    afterEach(() => {
      db.query("DELETE FROM auth");
    });

    describe("user registration", () => {
      describe("given user does not provide email", () => {
        it("should return a 400", async () => {
          const userWithoutEmail = {
            password: "password123",
          };
          const expectedMessage = "Missing email or password";

          const { statusCode, body } = await request(app)
            .post("/auth/signUp")
            .send(userWithoutEmail);

          expect(statusCode).toBe(400);
          expect(body).toHaveProperty("message", expectedMessage);
        });
      });

      describe("given email does not exist", () => {
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
      describe("given email does exist", () => {
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
});
