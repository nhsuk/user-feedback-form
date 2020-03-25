import Screen from '../screen';
import html from './template.html';

export default class ConfirmationScreen extends Screen {
  render() {
    this.updateHtml(html);
  }
}
