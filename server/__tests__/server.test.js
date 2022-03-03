import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import { QuizApp } from "../quizApp.js"

const app = express();
app.use(bodyParser.json());
app.use("/api",QuizApp );


describe("the quiz app", () =>{
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
})