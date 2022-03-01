import ReactDOM from "react-dom";
import React from "react";
import {FrontPage} from "../Quiz.jsx"
import { MemoryRouter} from "react-router-dom";

describe("quiz app", ()=>{
    it("shows front page", ()=>{
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                {" "}
                <FrontPage />
            </MemoryRouter>,
            element
        );
        // tester h1
        expect(element.querySelector("h1").innerHTML).toEqual("Start Quiz");
        // tester snapshots av diven
        expect(element.innerHTML).toMatchSnapshot();
    })
})

