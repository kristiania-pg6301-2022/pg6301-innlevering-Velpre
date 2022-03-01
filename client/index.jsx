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


function RandonQuesiton() {

    const [data, setData] = useState();
    const [error, setError] = useState();
    const[loading, setLoading] = useState(true)

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

    return <div>
            <h1>{data.question}</h1>
            <p>ID: {data.id} ({data.category})</p>

            <ul>
                {
                  Object.keys(data.answers)
                        .filter(a => data.answers[a] != null)
                        .map((a, i) => {
                            return <ul key={i}>
                                <button>{data.answers[a]}</button>
                            </ul>
                        })
                }
            </ul>
        </div>
}




function App (){
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}></Route>
            <Route path={"/question"} element={<RandonQuesiton/>}></Route>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("root"))