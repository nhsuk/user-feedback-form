import InitialQuestion from './initial-question';

const container = document.querySelector('#nhsuk-user-feedback-form');

const initialQuestion = new InitialQuestion(container);
initialQuestion.render();
