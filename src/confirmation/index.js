import Screen from '../screen';
import html from './template.html';

export default class ConfirmationScreen extends Screen {
  render() {
    const node = this.updateHtml(html);
    const thankYouMessage = node.querySelector('#thank-you-message');
    thankYouMessage.focus();
  }
}
