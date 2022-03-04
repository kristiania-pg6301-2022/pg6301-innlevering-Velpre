import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import { QuizApp } from "../quizApp.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api", QuizApp);

describe("the quiz app", () => {
  it("returns a random question", async () => {
    const response = await request(app).get("/api/question").expect(200);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      answers: expect.any(Object),
      category: expect.any(String),
    });
    expect(response.body).not.toHaveProperty("correct_answers");
  });
  it("returns 404 on non existing question", async () => {
    await request(app).post("/api/question").send({ id: 123 }).expect(404);
  });
  it("responds { result: true } to correct answers", async () => {
    await request(app)
      .post("/api/question")
      .send({ id: 987, answer: "answer_c" })
      .expect({ result: true });
  });
  it("responds { result: false } to incorrect answers", async () => {
    await request(app)
      .post("/api/question")
      .send({ id: 987, answer: "answer_a" })
      .expect({ result: false });
  });

  it("counts stats for quiz, n right and n answers", async () => {
    const agent = request.agent(app);
    await agent.post("/api/question").send({ id: 987, answer: "answer_c" });
    await agent.post("/api/question").send({ id: 987, answer: "answer_a" });
    await agent.post("/api/question").send({ id: 983, answer: "answer_a" });
    await agent
      .get("/api/score")
      .expect(200)
      .expect({ answers: 3, correct: 2 });
  });
});
