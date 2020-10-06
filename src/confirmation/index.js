import Screen from '../screen';
import html from './template.html';

export default class ConfirmationScreen extends Screen {
  render() {
    this.updateHtml(html);

    const node = this.updateHtml(html);
    const header = node.querySelector('.nhsuk-user-feedback-form-header');
    header.setAttribute('tabIndex', '-1');
    header.focus();
  }
}
