import Screen from '../screen';
import html from './template.html';

export default class ConfirmationScreen extends Screen {
  getEnableTextResponse() {
    return this.app.enableTextResponse;
  }

  render() {
    const textResponseLabel = '<p>We do not check feedback every day and cannot respond to comments.</p>';
    const blankLabel = '';

    let label;

    /* If data-enable-text-response attribute is "false" show a blank label */
    if (this.getEnableTextResponse() === false) {
      label = blankLabel;
    } else {
      label = textResponseLabel;
    }

    const optionalHtml = html.replace('{{ label }}', label);

    const node = this.updateHtml(optionalHtml);
    const header = node.querySelector('.nhsuk-user-feedback-form-header');
    header.setAttribute('tabIndex', '-1');
    header.focus();
  }
}
