import SatisfiedScreen from './satisfied';
import TextCommentsScreen from './text-comments';
import ConfirmationScreen from './confirmation';

import PostData from './post-data';

/**
 * Get settings from data attributes on the container div
 * @returns {Object} settings
 */
const getSettingsFromContainer = (container) => ({
  formEndpoint: container.getAttribute('data-form-endpoint'),
});

/**
 * Class representing the entire app
 */
class App {
  /**
   * @param {Object} settings - settings to use when instantiating the app
   */
  constructor(settings) {
    this.container = document.querySelector(settings.cssSelector);

    // Javascript settings take precedence over html attribute settings
    this.settings = {
      ...getSettingsFromContainer(this.container),
      ...settings,
    };

    if (!this.settings.formEndpoint) {
      throw Error('formEndpoint setting or data-form-endpoint attribute must be defined');
    }

    this.postData = new PostData(this.settings.formEndpoint);

    // The initial question's yes/no response. true=yes, false=no, null=unanswered.
    this.isSatisfiedResponse = null;
  }

  onYes() {
    this.isSatisfiedResponse = true;
    this.postData.postYes();
    new TextCommentsScreen(this).render();
  }

  onNo() {
    this.isSatisfiedResponse = false;
    this.postData.postNo();
    new TextCommentsScreen(this).render();
  }

  onTextSubmit(value) {
    if (value) {
      this.postData.postComment(value);
    }
    new ConfirmationScreen(this).render();
  }

  onTextClose() {
    this.render();
  }

  render() {
    new SatisfiedScreen(this).render();
  }
}

/**
 * @param {Object} settings
 * @param {string} settings.formEndpoint - API endpoint to post data to
 * @param {string} settings.cssSelector - CSS selector to get the container div
 */
export default function (settings = {}) {
  const settingsWithDefaults = {
    cssSelector: '#nhsuk-user-feedback-form',
    ...settings,
  };

  const app = new App(settingsWithDefaults);
  app.render();
}
