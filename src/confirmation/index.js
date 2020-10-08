import Screen from '../screen';
import html from './template.html';

export default class ConfirmationScreen extends Screen {
  getDisableTextResponse() {
    return this.app.disableTextResponse;
  }

  render() {
    const textResponseLabel = '<p>We do not check feedback every day and cannot respond to comments.</p>';
    const blankLabel = '';

    let label;

    /* If data-disable-text-response attribute is "true" show a blank label */
    if (this.getDisableTextResponse() === true) {
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
