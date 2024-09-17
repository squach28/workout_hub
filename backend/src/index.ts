import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./routes/auth";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", router);

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
