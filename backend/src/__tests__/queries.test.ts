import { insertUser, getUserByEmail, insertExercise } from "../utils/queries";
import { db } from "../utils/db";

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
        const result = await insertExercise(exercise.name, exercise.type);
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
    // describe("getExercises", () => {
    //   const exercises = [
    //     {
    //       id: 1,
    //       name: "Bench Press",
    //       type: "Weightlifting",
    //     },
    //     {
    //       id: 2,
    //       name: "Squat",
    //       type: "Weightlifting",
    //     },
    //     {
    //       id: 3,
    //       name: "Treadmill",
    //       type: "Cardio",
    //     },
    //   ];
    // });
  });
});
