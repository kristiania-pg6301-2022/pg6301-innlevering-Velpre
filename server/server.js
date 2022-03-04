import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { QuizApp } from "./quizApp.js";
const app = express();

app.use(bodyParser.json());
// endpoint for alle pather som starter med /api:
app.use("/api", QuizApp);

//Håndterer filer
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on: http://localhost:${server.address().port}`);
});
