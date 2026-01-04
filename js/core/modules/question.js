import { Router } from "../router.js";

export default class Questions {
  #currentIndex = 0;
  #allQuestions = [];
  #score = 0;
  #Router = new Router();
  #aswered = false;
  #questionsContainer = document.querySelector(".questions-container");
  constructor(allQuestions) {
    this.#allQuestions = allQuestions;
    this.#allQuestions[this.#currentIndex];
    this.display();
  }
  display() {
    const { category, question, incorrect_answers, correct_answer } =
      this.getCurrentQuestion();
    const allChoices = this.shuffle([correct_answer, ...incorrect_answers]);
    const cartoona = `
    <div
          class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
        >
          <div class="w-100 d-flex justify-content-between">
            <span class="btn btn-category">${category}</span>
            <span class="fs-6 btn btn-questions">${this.#currentIndex + 1} of ${
      this.#allQuestions.length
    } Questions</span>
          </div>
          <h2 class="text-capitalize h4 text-center">${question}</h2>  
          <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
          ${allChoices.map((choice) => `<li>${choice}</li>`).join("")}
          </ul>
               
        </div>
    `;
    this.#questionsContainer.innerHTML = cartoona;
    this.initAnswersListeners();
  }
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  initAnswersListeners() {
    this.#questionsContainer.querySelectorAll(".choices li").forEach((e) => {
      e.addEventListener("click", (e) => {
        this.checkAnsware(e.target);
      });
    });
  }
  checkAnsware(useAnsware) {
    if (this.#aswered) return;
    this.#aswered = true;
    const { correct_answer } = this.getCurrentQuestion();
    if (correct_answer === useAnsware.innerHTML) {
      console.log("correct");
      useAnsware.classList.add("correct");
      this.#score++;
    } else {
      console.log("incorrect");
      useAnsware.classList.add("wrong");
    }
    this.animationQuestion(useAnsware, this.nextQuestion, 1000);
    this.#aswered = false;
  }
  animationQuestion(element, fun, time) {
    element
      .closest(".question")
      .classList.replace("animate__bounceIn", "animate__backOutLeft");
    setTimeout(fun.bind(this), time);
  }
  getCurrentQuestion() {
    return this.#allQuestions[this.#currentIndex];
  }
  nextQuestion() {
    if (this.#currentIndex < this.#allQuestions.length - 1) {
      this.#currentIndex++;
      this.display();
      console.log("nexxt");
    } else {
      console.log("finish");
      this.#Router.navigation("score", this.#score);
    }
  }
}
