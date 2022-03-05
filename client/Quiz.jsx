import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { fetchJSON, postJSON } from "./http.js";
import { useLoading } from "./useLoading";

export function FrontPage() {
  const { data, error, loading, reload } = useLoading(
    async () => await fetchJSON("/api")
  );

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return <p>{error.toString()}</p>;
  }

  return (
    <div>
      <h1>Start Quizzzzz</h1>
      <ul>
        <li>
          <Link to={"/question"}>Choose question</Link>
        </li>
        <li>
          <Link to={"/score"}>Display Score</Link>
        </li>
      </ul>
    </div>
  );
}

export function RandomQuestion() {
  const { data, error, loading, reload } = useLoading(
    async () => await fetchJSON("api/question")
  );
  const [answeredQuestion, setAnsweredQuestion] = useState();

  async function handleAnswer(answer) {
    const { id } = data;
    setAnsweredQuestion(await postJSON("/api/question", answer, id));
    await reload();
  }

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return { error };
  }
  const answers = Object.keys(data.answers).filter(
    (a) => data.answers[a] != null
  );
  return (
    <div>
      <h1>{data.question}</h1>
      <ul>
        {answers.map((a, i) => {
          return (
            <ul key={i}>
              <button onClick={() => handleAnswer(a)}>{data.answers[a]}</button>
            </ul>
          );
        })}
      </ul>
      <p>
        {answeredQuestion
          ? "svar på forrige spørsmål:" + answeredQuestion.result.toString()
          : null}
      </p>
      <Link to={"/score"}> Check Score</Link>
    </div>
  );
}

function Score() {
  const { data, error, loading, reload } = useLoading(
    async () => await fetchJSON("api/score")
  );
  if (loading) {
    return "Loading...";
  }

  if (error) {
    return { error };
  }
  const { answers, correct } = data;

  return (
    <div>
      <h1>
        Out of {answers} questions you have answered {correct} correctly
      </h1>
      <ul>
        <li>
          <Link to={"/question"}>Next question</Link>
        </li>
        <li>
          <Link to={"/"}>Close Quiz</Link>
        </li>
      </ul>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />}></Route>
        <Route path={"/question"} element={<RandomQuestion />}></Route>
        <Route path={"/score"} element={<Score />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
