import Screen from '../screen';
import template from './template.html';
import constants from '../constants';

const { confirmation: { heading, message } } = constants;

export default class ConfirmationScreen extends Screen {
  getEnableTextResponse() {
    return this.app.enableTextResponse;
  }

  render() {
    const html = template({
      enableTextResponse: this.getEnableTextResponse(),
      heading,
      message,
    });

    const node = this.updateHtml(html);
    const header = node.querySelector('.nhsuk-user-feedback-form-header');
    header.setAttribute('tabIndex', '-1');
    header.focus();
  }
}
