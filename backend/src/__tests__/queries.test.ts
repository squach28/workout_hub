import {
  insertUser,
  getUserByEmail,
  insertExercise,
  getExercises,
} from "../utils/queries";
import { db } from "../utils/db";
import { Exercise } from "../types/Exercise";

describe("db queries", () => {
  describe("user queries", () => {
    afterEach(async () => {
      await db.query("DELETE FROM auth");
    });
    describe("insertUser", () => {
      const userInfo = {
        email: "bob@gmail.com",
        password: "password123",
      };
      it("user should be returned if email doesn't exist in db", async () => {
        await insertUser(userInfo.email, userInfo.password);
        const user = await getUserByEmail(userInfo.email);
        expect(user).toHaveProperty("email", userInfo.email);
        expect(user).toHaveProperty("uuid");
      });

      it("null should be returned if email exists in db", async () => {
        await insertUser(userInfo.email, userInfo.password);
        const user = await insertUser(userInfo.email, userInfo.password);
        expect(user).toBe(null);
      });
    });

    describe("getUserByEmail", () => {
      const userInfo = {
        email: "bob@gmail.com",
        password: "password123",
      };
      it("null should be returned if user doesn't exist", async () => {
        const user = await getUserByEmail(userInfo.email);
        expect(user).toBe(null);
      });

      it("uuid and email should be returned if email exists", async () => {
        await insertUser(userInfo.email, userInfo.password);
        const user = await getUserByEmail(userInfo.email);
        expect(user).toHaveProperty("uuid");
        expect(user).toHaveProperty("email", userInfo.email);
      });
    });
  });
  describe("exercise queries", () => {
    afterEach(async () => {
      await db.query("DELETE FROM exercises");
      await db.query("ALTER SEQUENCE exercises_id_seq RESTART WITH 1");
    });

    describe("insertExercise", () => {
      it("insertExercise should return the same exercise with a generated id", async () => {
        const exercise = {
          name: "Bench Press",
          type: "Weightlifting",
        };
        const result = (await insertExercise(
          exercise.name,
          exercise.type
        )) as Exercise;
        expect(result).toHaveProperty("id");
        expect(result.name).toBe(exercise.name);
        expect(result.type).toBe(exercise.type);
      });

      it("insertExercise should return null if exercise with name already exists", async () => {
        const exercise = {
          name: "Bench Press",
          type: "Weightlifting",
        };
        await insertExercise(exercise.name, exercise.type);
        const result = await insertExercise(exercise.name, exercise.type);
        expect(result).toBe(null);
      });
    });
    describe("getExercises", () => {
      it("getExercises should return empty list", async () => {
        const result = await getExercises();
        expect(result).toHaveLength(0);
      });

      it("getExercises should return length of 3 when 3 exercises are added", async () => {
        const exercises = [
          {
            name: "Bench Press",
            type: "Weightlifting",
          },
          {
            name: "Squat",
            type: "Weightlifting",
          },
          {
            name: "Treadmill",
            type: "Cardio",
          },
        ];
        await insertExercise(exercises[0].name, exercises[0].type);
        await insertExercise(exercises[1].name, exercises[1].type);
        await insertExercise(exercises[2].name, exercises[2].type);

        const result = await getExercises();

        expect(result).toHaveLength(exercises.length);
      });
    });
  });
});
