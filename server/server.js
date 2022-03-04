import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { QuizApp } from "./quizApp.js";

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// endpoint for all paths /api:
app.use("/api", QuizApp);

//Handling path to files
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});
// starting server
const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on: http://localhost:${server.address().port}`);
});
