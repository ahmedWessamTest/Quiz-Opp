import { Router } from "../router.js";

export default class Score {
  #questionContainer = document.querySelector(".questions-container");
  #Router = new Router();
  constructor(score) {
    this.score = score;
    this.displayScore();
  }
  displayScore() {
    this.#questionContainer.innerHTML = `
    <div id="tryAgainContainer" class="text-center text-white animate__animated animate__bounceIn">
        <h1>Your Score is <span>${this.score}</span></h1>
        <button class="btn btn-danger" id="tryAgainBtn">Try Again</button>
    </div>
    `;
    this.tryAgainListener();
  }
  tryAgainListener() {
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    if (tryAgainBtn) {
      tryAgainBtn.addEventListener("click", () => {
        this.#Router.navigation("home");
      });
    }
  }
}
