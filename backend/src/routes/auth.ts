import express from "express";
import { login, signUp } from "../controllers/auth";

export const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
