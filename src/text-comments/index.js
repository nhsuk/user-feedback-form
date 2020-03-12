import updateHtml from '../html';
import html from './template.html';
import { postComment } from '../post';
import InitialQuestion from '../initial-question'; // eslint-disable-line import/no-cycle
import Confirmation from '../confirmation';

export default class TextComments {
  constructor(container) {
    this.container = container;
  }

  onClose(e) {
    e.preventDefault();
    new InitialQuestion(this.container).render();
  }

  onSubmit(value) {
    if (value) {
      postComment(value);
    }
    new Confirmation(this.container).render();
  }

  addListeners(node) {
    const closeButton = node.querySelector('.nhsuk-user-feedback-form--close');
    closeButton.addEventListener('click', this.onClose.bind(this));

    const submitButton = node.querySelector('.nhsuk-user-feedback-form--submit');
    submitButton.addEventListener('click', () => {
      const textarea = node.querySelector('textarea');
      this.onSubmit(textarea.value);
    });
  }

  render() {
    const node = updateHtml(this.container, html);
    this.addListeners(node);
  }
}
