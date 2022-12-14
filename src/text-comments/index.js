import Screen from '../screen';
import template from './template.hbs';

export default class TextCommentsScreen extends Screen {
  getInitialQuestionResponse() {
    return this.app.isSatisfiedResponse;
  }

  onSubmit(value) {
    // Trim input to 1000 characters to avoid validation errors
    const cleanValue = value.substr(0, 1000);
    this.app.onTextSubmit(cleanValue);
  }

  addListeners(node) {
    const submitButton = node.querySelector('.nhsuk-user-feedback-form--submit');
    submitButton.addEventListener('click', () => {
      const textarea = node.querySelector('textarea');
      this.onSubmit(textarea.value);
    });
  }

  render() {
    const yesLabel = 'What happened to make you visit the NHS website today?';
    const noLabel = 'What were you looking for?';
    const label = this.getInitialQuestionResponse() ? yesLabel : noLabel;
    const html = template({
      label,
    });

    const node = this.updateHtml(html);
    const moreDetail = node.querySelector('#more-detail');
    moreDetail.focus();

    this.addListeners(node);
  }
}
