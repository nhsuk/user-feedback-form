import updateHtml from '../html';
import html from './template.html';

export default class Confirmation {
  constructor(app) {
    this.app = app;
  }

  render() {
    updateHtml(this.app.container, html);
  }
}
