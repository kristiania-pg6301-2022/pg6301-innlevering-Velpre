import * as ReactDOM from "react-dom";
import * as React from "react";
import {Link, Routes, Route, BrowserRouter} from "react-router-dom"
import {useEffect, useState} from "react";

function FrontPage(){
    return<div>
        <h1>Start Quiz</h1>
        <ul>
            <li><Link to={"/question"}>Choose question</Link></li>
        </ul>
    </div>
}


function RandomQuestion() {

    const [data, setData] = useState();
    const [error, setError] = useState();
    const[loading, setLoading] = useState(true)
    const [answeredQuestion, setAnsweredQuestion] = useState();

    async function handleAnswer(answer){
        const {id} = data;
         const res = await fetch("/api/question",{
            method:"post",
            body: JSON.stringify({answer,id}),
            headers: {
                "content-type": "application/json",
            },
        });

        setAnsweredQuestion(await res.json())
    }

    useEffect(async ()=>{
        try{
            const res = await fetch("/api/question")
            setData(await res.json())
        }catch (e){
            setError(e);
        }finally {
            setLoading(false);
        }
    }, [])

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

            <p>{answeredQuestion ? answeredQuestion.result.toString() : null}</p>
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