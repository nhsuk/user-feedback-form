import InitialQuestion from './initial-question';

export default function (cssSelector = '#nhsuk-user-feedback-form') {
  const container = document.querySelector(cssSelector);

  const initialQuestion = new InitialQuestion(container);
  initialQuestion.render();
}
