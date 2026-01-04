import Questions from "./modules/question.js";
import Score from "./modules/score.js";

export class Router {
  constructor() {
    window.addEventListener("popstate", (e) => {
      console.log(e.state);
    });
  }
  navigation(navigaion, data) {
    history.pushState({ navigaion, data }, "", `/${navigaion}`);
    switch (navigaion) {
      case "questions":
        if (data !== undefined) {
          this.#toQuestions(data);
        } else {
          console.error("question data missing");
        }
        break;
      case "score":
        if (data !== undefined) {
          this.#toScore(data);
        } else {
          console.error("Score data missing");
        }
        break;
      case "home":
        this.#toHome();
        break;
      default:
        this.#notFound();
    }
  }
  #toQuestions(data) {
    const questionsForm = document.getElementById("quizOptions");
    questionsForm.classList.replace("d-flex", "d-none");
    new Questions(data);
  }
  #toScore(data) {
    new Score(data);
  }
  #toHome() {
    const questionsForm = document.getElementById("quizOptions");
    const questionsContainer = document.querySelector(".questions-container");
    questionsContainer.innerHTML = "";
    questionsForm.classList.replace("d-none", "d-flex");
  }
  #notFound() {
    // code to navigate not found page
  }
}
