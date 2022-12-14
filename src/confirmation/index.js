import Screen from '../screen';
import template from './template.hbs';

export default class ConfirmationScreen extends Screen {
  getEnableTextResponse() {
    return this.app.enableTextResponse;
  }

  render() {
    let message;

    /* If data-enable-text-response attribute is "false" show a blank label */
    if (this.getEnableTextResponse() === false) {
      message = '';
    } else {
      message = 'We do not check feedback every day and cannot respond to comments.';
    }

    const optionalHtml = template({
      optionalTextResponseMessage: message,
    });

    const node = this.updateHtml(optionalHtml);
    const header = node.querySelector('.nhsuk-user-feedback-form-header');
    header.setAttribute('tabIndex', '-1');
    header.focus();
  }
}
