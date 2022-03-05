import ReactDOM from "react-dom";
import React from "react";
import { FrontPage, RandomQuestion} from "../Quiz.jsx";
import { MemoryRouter } from "react-router-dom";
import { act, Simulate } from "react-dom/test-utils";


describe("quiz app", () => {
    // Fake data instead of calling the real backend
    const getQuestion = ()=> ({
        question: "Are you happy?",
        answers: {
            answer_a: "Yes",
            answer_b: "No",
            answer_c: "Maybe",
        },
        correct_answers: {
            answer_a_correct: "true",
            answer_b_correct: "false",
            answer_c_correct: "false",
        },
    });

  it("shows random question", async () => {
    const element = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
          <MemoryRouter initialEntries={["/api/question"]}>
              <RandomQuestion questions={{getQuestion}} />
          </MemoryRouter>,
          element
      );
    })
      expect(element.innerHTML).toMatchSnapshot();
  });



});
