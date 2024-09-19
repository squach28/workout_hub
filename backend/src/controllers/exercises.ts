import { Request, Response } from "express";
import { getExercises } from "../utils/queries";

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await getExercises();
    res.status(200).json(exercises);
    return;
  } catch (e) {
    console.log(e);
    return null;
  }
};
