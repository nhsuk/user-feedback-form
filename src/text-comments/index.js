import updateHtml from '../html';
import html from './template.html';

export default class TextComments {
  constructor(app) {
    this.app = app;
  }

  onClose(e) {
    e.preventDefault();
    this.app.onTextClose();
  }

  onSubmit(value) {
    this.app.onTextSubmit(value);
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
    const node = updateHtml(this.app.container, html);
    this.addListeners(node);
  }
}
