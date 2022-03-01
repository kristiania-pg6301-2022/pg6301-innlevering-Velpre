import express from "express"
import path from "path";
import {randomQuestion, isCorrectAnswer } from "./questions.js"
const app = express();


app.get("/api", (req,res)=>{
    res.send("første")
})

app.get("/api/question", (req,res)=>{
    const {id, category, question, answers} = randomQuestion();
    res.json({question, answers, id, category,})
})


//Håndterer filer
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3001,()=>{
    console.log(`server running on: http://localhost:${server.address().port}`);
})