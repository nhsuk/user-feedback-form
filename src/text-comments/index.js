import Screen from '../screen';
import template from './template.html';

export default class TextCommentsScreen extends Screen {
  getInitialQuestionResponse() {
    return this.app.isSatisfiedResponse;
  }

  onClose(e) {
    e.preventDefault();
    this.app.onTextClose();
  }

  onSubmit(value) {
    // Trim input to 1000 characters to avoid validation errors
    const cleanValue = value.substr(0, 1000);
    this.app.onTextSubmit(cleanValue);
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
    /**
     * replace known template string with question label.
     * If this gets any more complicated, we will have to use a proper templating library
     */
    const yesLabel = 'Is there anything we could do to make it better?';
    const noLabel = 'What were you looking for?';
    const label = this.getInitialQuestionResponse() ? yesLabel : noLabel;
    const html = template.replace('{{ label }}', label);

    const node = this.updateHtml(html);
    this.addListeners(node);
  }
}
