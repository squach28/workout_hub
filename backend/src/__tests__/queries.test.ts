import { insertUser, getUserByEmail } from "../utils/queries";
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
});
