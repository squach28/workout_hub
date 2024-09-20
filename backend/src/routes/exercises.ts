import express from "express";
import { getAllExercises, addExercise } from "../controllers/exercises";

export const router = express.Router();

router.get("/", getAllExercises);
router.post("/", addExercise);
