import updateHtml from '../html';
import html from './template.html';

export default class Confirmation {
  constructor(container) {
    this.container = container;
  }

  render() {
    updateHtml(this.container, html);
  }
}
