import express from "express";
import { getAllExercises } from "../controllers/exercises";

export const router = express.Router();

router.get("/", getAllExercises);
