import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "../routes/auth";
import cookieParser from "cookie-parser";

export const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.get("/", (req, res) => {
    res.status(200).send("hello world");
  });

  app.use("/auth", router);
  return app;
};
