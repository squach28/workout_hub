import { QueryResult } from "pg";
import { db } from "./db";

const queries = {
  insertUser:
    "INSERT INTO auth (email, password) VALUES ($1, $2) RETURNING uuid, email",
  getUserByEmail: "SELECT uuid, email FROM auth WHERE email = $1",
  getHashByEmail: "SELECT password FROM auth WHERE email = $1",
};

export const commitTransaction = async (
  query: string,
  values: string[]
): Promise<QueryResult | null> => {
  try {
    await db.query("BEGIN");
    const result = await db.query(query, values);
    return result;
  } catch (e) {
    console.log(e);
    await db.query("ROLLBACK");
    return null;
  }
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
    const result = await commitTransaction(queries.insertUser, [
      userEmail,
      hash,
    ]);
    if (result === null) {
      return null;
    }
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
