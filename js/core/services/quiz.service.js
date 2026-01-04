import environment from "../env.js";

export default class QuizService {
  async getQuestions({ amount, category, difficulty }) {
    const response = await fetch(
      `${environment.baseUrl}?amount=${amount}${
        category ? "&category=" + category : ""
      }&difficulty=${difficulty}`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  }
}
