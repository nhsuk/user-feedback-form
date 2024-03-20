import SatisfiedScreen from './satisfied';
import TextCommentsScreen from './text-comments';
import ConfirmationScreen from './confirmation';

import onFeedbackEvent from './events';

import PostData from './post-data';

import './nhsuk-feedback-form.css';

function getEnableTextResponse(container) {
  return container.hasAttribute('data-enable-text-response');
}

/**
 * Get settings from data attributes on the container div
 * @returns {Object} settings
 */
const getSettingsFromContainer = (container) => ({
  enableTextResponse: getEnableTextResponse(container),
  formEndpoint: container.getAttribute('data-form-endpoint'),
});

class App {
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

    this.enableTextResponse = this.settings.enableTextResponse;
  }

  onYes() {
    this.isSatisfiedResponse = true;
    this.postData.postYes();

    if (this.enableTextResponse === false) {
      new ConfirmationScreen(this).render();
    } else {
      new TextCommentsScreen(this).render();
    }

    onFeedbackEvent(this.container, true);
  }

  onNo() {
    this.isSatisfiedResponse = false;
    this.postData.postNo();

    if (this.enableTextResponse === false) {
      new ConfirmationScreen(this).render();
    } else {
      new TextCommentsScreen(this).render();
    }

    onFeedbackEvent(this.container, false);
  }

  onTextSubmit(value) {
    this.postData.postComment(value);
    new ConfirmationScreen(this).render();
  }

  render() {
    new SatisfiedScreen(this).render();
  }
}

/**
 *
 * @param {Object} settings
 * @param {string} settings.formEndpoint - API endpoint to post data to
 * @param {string} settings.cssSelector - CSS selector to get the container div
 * @param {boolean} settings.enableTextResponse - Disables text responses from the form
 */
 const defaultFunction = function nhsUserFeedback(settings = {}) {
  const settingsWithDefaults = {
    cssSelector: '#nhsuk-user-feedback-form',
    ...settings,
  };

  const app = new App(settingsWithDefaults);
  app.render();
};

export default defaultFunction;
