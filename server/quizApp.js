import express from "express";
export const QuizApp = express.Router();
import { randomQuestion, isCorrectAnswer, Questions } from "./questions.js";

QuizApp.get("/", (req, res) => {
  if (req.signedCookies.score) {
    res.clearCookie("score");
  }
  res.sendStatus(200);
});

QuizApp.get("/question", (req, res) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ question, answers, id, category });
});

QuizApp.post("/question", (req, res) => {
  const { id, answer } = req.body;
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    return res.sendStatus(404);
  }
  // score
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  score.answers += 1;
  if (isCorrectAnswer(question, answer)) {
    // adding correct ans
    score.correct += 1;
    // signing cookie
    res.cookie("score", JSON.stringify(score), { signed: true });
    // response:
    res.json({ result: true });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    res.json({ result: false });
  }
});

QuizApp.get("/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answer: 0, correct: 0 };
  res.send(score);
});
