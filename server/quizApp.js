import express from "express";
export const QuizApp = express.Router();
import { randomQuestion, isCorrectAnswer, Questions } from "./questions.js";

QuizApp.get("/", (req, res) => {
    res.send("første");
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
    if (isCorrectAnswer(question, answer)) {
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
});
