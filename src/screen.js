/**
 * @module screen
 */

/**
 * Extend this class to create a new Screen in the app user flow.
 * Must implement a `render()` method which is responsible for rending the screen's HTML
 */
export default class Screen {
  /**
   * @constructor
   * @param {App} app - The app object.
   */
  constructor(app) {
    if (this.constructor === Screen) {
      throw new TypeError('Abstract class `Screen` cannot be instantiated directly.');
    }

    if (this.render === undefined) {
      throw new TypeError('Clases extending `Screen` should define a `render` method');
    }

    this.app = app;
  }

  /**
   * Inserts html into the container element.
   * Returns the new DOM element containing the html -  useful for attaching event listeners
   *
   * @param {HTMLElement} container DOM node to insert the new html into
   * @param {string} html HTML to insert into the container
   *
   * @returns {HTMLElement} A new div element containing the given html
   */
  updateHtml(html) {
    // Remove all container children before adding new html
    this.app.container.childNodes.forEach((child) => {
      child.remove();
    });

    // Create a new element to insert into the container
    const newChild = document.createElement('div');
    newChild.className = 'nhsuk-user-feedback-form';
    newChild.innerHTML = html;
    this.app.container.appendChild(newChild);
    return newChild;
  }
}
