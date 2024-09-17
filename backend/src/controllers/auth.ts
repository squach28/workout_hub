import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../utils/db";
import { queries } from "../utils/queries";

export const signUp = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: "Missing email or password" });
    return;
  }

  const saltRounds = 10;
  bcrypt.genSalt((err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      db.query(queries.insertUser, [email, hash], (err, result) => {
        if (err) throw err;
        const user = result.rows[0];
        res.status(201).json({ uuid: user.uuid, email: user.email });
        return;
      });
    });
  });
};
