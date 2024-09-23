import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../utils/db";
import { getUserByEmail, insertUser, getHashByEmail } from "../utils/queries";
import { generateJWT } from "../middleware/jwtMiddleware";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: "Missing email or password" });
    return;
  }
  try {
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

    if (user === null) {
      res.status(500).json({
        message: "Something bad happened, please try again later",
      });
      return;
    }

    const token = generateJWT(user.uuid);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({
      uuid: user.uuid,
      email: user.email,
    });
    return;
  } catch (e) {
    res.status(500).json({
      message: "Something bad happened, please try again later",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: "Missing email or password" });
    return;
  }

  const userExists = await getUserByEmail(email);

  if (userExists === null) {
    res.status(404).json({ message: `${email} does not exist` });
    return;
  }

  const hash = await getHashByEmail(email);

  if (hash === null) {
    res.status(500).json({ message: "Something went wrong, try again later." });
    return;
  }

  const match = await comparePasswords(password, hash);

  if (match) {
    res.status(200).json({ message: "Success" });
    return;
  } else {
    res.status(400).json({ message: "Wrong password" });
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

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean | null> => {
  try {
    const compare = await bcrypt.compare(password, hash);
    return compare;
  } catch (e) {
    console.log(e);
    return null;
  }
};
