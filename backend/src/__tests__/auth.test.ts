import request from "supertest";
import { createServer } from "../utils/server";
import { db } from "../utils/db";
import { comparePasswords, hashPassword } from "../controllers/auth";
import { getUserByEmail, insertUser, getHashByEmail } from "../utils/queries";
import { verifyJWT } from "../middleware/jwtMiddleware";
import { JwtPayload } from "jsonwebtoken";

const app = createServer();

describe("auth", () => {
  describe("test database functions in auth", () => {
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

  describe("test password hashing and comparisons", () => {
    it("comparePasswords should return true if passwords match", async () => {
      const password = "password123";
      const hash = await hashPassword(password);
      console.log(hash);
      expect(hash).not.toBe(null);
      if (hash) {
        const comparison = await comparePasswords(password, hash);
        console.log(comparison);
        expect(comparison).toBe(true);
      }
    });

    it("comparePasswords should return false if passwords do not match", async () => {
      const password = "password123";
      const passwordToTry = "password";
      const hash = await hashPassword(password);
      expect(hash).not.toBe(null);
      if (hash) {
        const comparison = await comparePasswords(passwordToTry, hash);
        expect(comparison).toBe(false);
      }
    });
  });
  // /auth/signup
  describe("post signup route", () => {
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
          const response = await request(app).post("/auth/signUp").send(user);

          const cookies = response.headers["set-cookie"];
          const accessTokenPair = cookies[0].split(";")[0];
          const accessToken = accessTokenPair.split("=")[1];

          const decoded = verifyJWT(accessToken) as JwtPayload;

          expect(decoded.uuid).not.toBe(null);
          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty("uuid");
          expect(response.body).toHaveProperty("email", user.email);
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
  // /auth/login
  describe("post login route", () => {
    afterEach(() => {
      db.query("DELETE FROM auth");
    });

    describe("user login", () => {
      describe("given email is missing", () => {
        it("should return a 400", async () => {
          const userWithoutEmail = {
            password: "password123",
          };
          const errorMessage = "Missing email or password";
          const result = await request(app)
            .post("/auth/login")
            .send(userWithoutEmail);
          expect(result.statusCode).toBe(400);
          expect(result.body).toHaveProperty("message", errorMessage);
        });
      });

      describe("given password is missing", () => {
        it("should return a 400", async () => {
          const userWithoutPassword = {
            email: "bob@gmail.com",
          };
          const errorMessage = "Missing email or password";
          const result = await request(app)
            .post("/auth/login")
            .send(userWithoutPassword);
          expect(result.statusCode).toBe(400);
          expect(result.body).toHaveProperty("message", errorMessage);
        });
      });

      describe("given password is incorrect", () => {
        it("should return a 400", async () => {
          const userInfo = {
            email: "bob@gmail.com",
            password: "password123",
          };
          // sign up user
          const signupRequest = await request(app)
            .post("/auth/signup")
            .send(userInfo);
          // expect successful sign up with correct user info returned
          expect(signupRequest.statusCode).toBe(201);
          expect(signupRequest.body).toHaveProperty("uuid");
          expect(signupRequest.body).toHaveProperty("email", userInfo.email);

          const incorrectPassword = {
            email: "bob@gmail.com",
            password: "wrongPassword",
          };
          const incorrectPasswordMessage = "Wrong password";

          const loginRequest = await request(app)
            .post("/auth/login")
            .send(incorrectPassword);

          expect(loginRequest.statusCode).toBe(400);
          expect(loginRequest.body).toHaveProperty(
            "message",
            incorrectPasswordMessage
          );
        });
      });

      describe("given email does not exist", () => {
        it("should return a 404", async () => {
          const userInfo = {
            email: "bob@gmail.com",
            password: "password123",
          };
          // sign up user
          const signupRequest = await request(app)
            .post("/auth/signup")
            .send(userInfo);
          // expect successful sign up with correct user info returned
          expect(signupRequest.statusCode).toBe(201);
          expect(signupRequest.body).toHaveProperty("uuid");
          expect(signupRequest.body).toHaveProperty("email", userInfo.email);

          const emailDoesNotExist = {
            email: "bob123@gmail.com",
            password: "password123",
          };
          const emailDoesNotExistMessage = `${emailDoesNotExist.email} does not exist`;

          const loginRequest = await request(app)
            .post("/auth/login")
            .send(emailDoesNotExist);

          expect(loginRequest.statusCode).toBe(404);
          expect(loginRequest.body).toHaveProperty(
            "message",
            emailDoesNotExistMessage
          );
        });
      });
    });
  });
});
