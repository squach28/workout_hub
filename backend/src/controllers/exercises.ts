import { Request, Response } from "express";
import { getExercises, insertExercise } from "../utils/queries";

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await getExercises();
    res.status(200).json(exercises);
    return;
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
  return;
};

export const addExercise = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;
    if (name === undefined || type === undefined) {
      res.status(400).json({ message: "Missing exercise name or type" });
      return;
    }

    const exercise = await insertExercise(name, type);

    res.status(201).json(exercise);
    return;
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
    return null;
  }
};
