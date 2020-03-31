import Screen from '../screen';
import html from './template.html';

export default class SatisfiedScreen extends Screen {
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
    const node = this.updateHtml(html);
    this.addListeners(node);
  }
}
