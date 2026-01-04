import { Router } from "./router.js";
import QuizService from "./services/quiz.service.js";

export default class App {
  #formElements = {
    form: document.getElementById("quizOptions"),
    submitBtn: document.getElementById("startQuiz"),
    controls: {
      categoryMenu: document.getElementById("categoryMenu"),
      difficultyOptions: document.getElementById("difficultyOptions"),
      questionsNumber: document.getElementById("questionsNumber"),
    },
  };
  #quizService = new QuizService();
  #Router = new Router();
  initApp() {
    this.#formElements.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitForm();
    });
  }
  async submitForm() {
    const formControls = this.#formElements.controls;
    const formData = {
      amount: formControls.questionsNumber.value,
      category: formControls.categoryMenu.value,
      difficulty: formControls.difficultyOptions.value,
    };
    const data = await this.#quizService.getQuestions(formData);
    this.#Router.navigation("questions", data);
  }
}
