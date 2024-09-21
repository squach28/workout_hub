import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router as authRouter } from "../routes/auth";
import { router as exercisesRouter } from "../routes/exercises";
import cookieParser from "cookie-parser";

export const createServer = () => {
  const app = express();

  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
  };
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use("/auth", authRouter);
  app.use("/exercises", exercisesRouter);

  app.get("/", (req, res) => {
    res.status(200).send("hello world");
  });

  return app;
};
