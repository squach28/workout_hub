import { db } from "../utils/db";
import { createServer } from "../utils/server";
import request from "supertest";

const app = createServer();

describe("exercises", () => {
  afterEach(async () => {
    await db.query("DELETE FROM exercises");
    // await db.query("ALTER SEQUENCE exercises_id_seq RESTART WITH 1");
  });
  // GET /exercises
  describe("get exercises route", () => {
    describe("given empty exercises table", () => {
      it("should return 200 with an empty array", async () => {
        const result = await request(app).get("/exercises");
        expect(result.statusCode).toBe(200);
        expect(result.body).toHaveLength(0);
      });
    });
    describe("given a table with 3 exercises", () => {
      //   it("should return 200 with 3 exercise objects", async () => {
      //     const exercises = [
      //       {
      //         name: "Bench Press",
      //         type: "Weightlifting",
      //       },
      //       {
      //         name: "Squat",
      //         type: "Weightlifting",
      //       },
      //       {
      //         name: "Treadmill",
      //         type: "Cardio",
      //       },
      //     ];
      //     const result = await request(app).get("/exercises");
      //     expect(result.statusCode).toBe(200);
      //     expect(result.body).toHaveLength(exercises.length);
      //   });
    });
  });

  // POST /exercises
  describe("post exercises route", () => {
    describe("given a valid exercise", () => {
      it("should return a 200 with the exercise", async () => {
        const exercise = {
          name: "Treadmill",
          type: "Cardio",
        };
        const result = await request(app).post("/exercises").send(exercise);

        expect(result.statusCode).toBe(201);
        expect(result.body).toHaveProperty("id");
        expect(result.body).toHaveProperty("name", exercise.name);
        expect(result.body).toHaveProperty("type", exercise.type);
      });
    });
    describe("given an exercise without a name", () => {
      it("should return a 400 with message", async () => {
        const exerciseWithoutName = {
          type: "Cardio",
        };
        const errorMessage = "Missing exercise name or type";

        const result = await request(app)
          .post("/exercises")
          .send(exerciseWithoutName);

        expect(result.statusCode).toBe(400);
        expect(result.body).toHaveProperty("message", errorMessage);
      });
    });
    describe("given an exercise without a type", () => {
      it("should return a 400 with message", async () => {
        const exerciseWithoutType = {
          name: "Bench Press",
        };
        const errorMessage = "Missing exercise name or type";
        const result = await request(app)
          .post("/exercises")
          .send(exerciseWithoutType);

        expect(result.statusCode).toBe(400);
        expect(result.body).toHaveProperty("message", errorMessage);
      });
    });
  });
});
