import * as ReactDOM from "react-dom";
import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import {fetchJSON, postJSON} from "./http.js";
import {useLoading} from "./useLoading";

function FrontPage(){
    return<div>
        <h1>Start Quiz</h1>
        <ul>
            <li><Link to={"/question"}>Choose question</Link></li>
        </ul>
    </div>
}

function RandomQuestion() {
    const {data, error, loading, reload} = useLoading(async() => await fetchJSON("api/question"))
    const [answeredQuestion, setAnsweredQuestion] = useState();

    async function handleAnswer(answer){
        const {id} = data;
        setAnsweredQuestion(await postJSON("/api/question", answer, id));
        await reload();
    }

    if (loading){
        return "Loading..."
    }

    if (error){
        return {error}
    }
    const answers = Object.keys(data.answers).filter(a => data.answers[a] != null);
    return <div>
            <h1>{data.question}</h1>
            <p>ID: {data.id} ({data.category})</p>
            <ul>
                {
                        answers.map((a, i) => {
                            return <ul key={i}>
                                <button onClick={() =>handleAnswer(a)}>
                                    {data.answers[a]}
                                </button>
                            </ul>
                        })
                }
            </ul>
            <p>{answeredQuestion ? "svar på forrige spørsmål:" + answeredQuestion.result.toString() : null}</p>
        </div>
}


function App (){
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}></Route>
            <Route path={"/question"} element={<RandomQuestion/>}></Route>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("root"))