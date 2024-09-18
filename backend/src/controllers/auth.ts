import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../utils/db";
import { queries } from "../utils/queries";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: "Missing email or password" });
    return;
  }

  const userExists = await getUserByEmail(email);

  if (userExists) {
    res
      .status(400)
      .json({ message: `User with email, ${email}, already exists` });
    return;
  }

  const hash = await hashPassword(password);

  if (hash === null) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }

  const user = await insertUser(email, hash);

  if (user) {
    res.status(201).json({
      uuid: user.uuid,
      email: user.email,
    });
    return;
  }

  res.status(500).json({
    message: "Something went wrong",
  });
  return;
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

export const hashPassword = async (
  password: string
): Promise<string | null> => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const insertUser = async (userEmail: string, hash: string) => {
  try {
    const result = await db.query(queries.insertUser, [userEmail, hash]);
    const { uuid, email } = result.rows[0];
    return { uuid, email };
  } catch (e) {
    console.log(e);
    return null;
  }
};
