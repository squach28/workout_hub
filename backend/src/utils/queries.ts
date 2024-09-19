import { db } from "./db";

const queries = {
  insertUser:
    "INSERT INTO auth (email, password) VALUES ($1, $2) RETURNING uuid, email",
  getUserByEmail: "SELECT uuid, email FROM auth WHERE email = $1",
  getHashByEmail: "SELECT password FROM auth WHERE email = $1",
};

export const getUserByEmail = async (
  email: string
): Promise<{ uuid: string; email: string } | null> => {
  try {
    const result = await db.query(queries.getUserByEmail, [email]);
    if (result.rowCount) {
      const user = result.rows[0];
      const { uuid, email } = user;
      return { uuid, email };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const insertUser = async (
  userEmail: string,
  hash: string
): Promise<{ uuid: string; email: string } | null> => {
  try {
    const userExists = await getUserByEmail(userEmail);
    if (userExists) {
      return null;
    }
    const result = await db.query(queries.insertUser, [userEmail, hash]);
    const { uuid, email } = result.rows[0];
    return { uuid, email };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getHashByEmail = async (email: string): Promise<string | null> => {
  try {
    const result = await db.query(queries.getHashByEmail, [email]);
    const { password } = result.rows[0].password;
    return password;
  } catch (e) {
    console.log(e);
    return null;
  }
};
