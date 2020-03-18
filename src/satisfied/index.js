import updateHtml from '../html';
import html from './template.html';

export default class Satisfied {
  constructor(app) {
    this.app = app;
  }

  onYes() {
    this.app.onYes();
  }

  onNo() {
    this.app.onNo();
  }

  addListeners(node) {
    const yesButton = node.querySelector('.nhsuk-user-feedback-form--yes');
    yesButton.addEventListener('click', this.onYes.bind(this));

    const noButton = node.querySelector('.nhsuk-user-feedback-form--no');
    noButton.addEventListener('click', this.onNo.bind(this));
  }

  render() {
    const node = updateHtml(this.app.container, html);
    this.addListeners(node);
  }
}
