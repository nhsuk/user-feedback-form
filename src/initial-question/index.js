import updateHtml from '../html';
import html from './template.html';
import TextComments from '../text-comments'; // eslint-disable-line import/no-cycle
import { postYes, postNo } from '../post';

export default class InitialQuestion {
  constructor(container) {
    this.container = container;
  }

  goToNextQuestion() {
    const textComments = new TextComments(this.container);
    textComments.render();
  }

  onYes() {
    postYes();
    this.goToNextQuestion();
  }

  onNo() {
    postNo();
    this.goToNextQuestion();
  }

  addListeners(node) {
    const yesButton = node.querySelector('.nhsuk-user-feedback-form--yes');
    yesButton.addEventListener('click', this.onYes.bind(this));

    const noButton = node.querySelector('.nhsuk-user-feedback-form--no');
    noButton.addEventListener('click', this.onNo.bind(this));
  }

  render() {
    const node = updateHtml(this.container, html);
    this.addListeners(node);
  }
}
