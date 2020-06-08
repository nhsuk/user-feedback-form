/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
});

/* eslint-disable arrow-body-style */
const listenToEvent = () => {
  return page.$eval('#nhsuk-user-feedback-form', (element) => {
    return new Promise((resolve) => {
      const listener = (event) => {
        // We only want this listener to fire once, so make sure we remove it
        element.removeEventListener('onFeedback', listener);
        resolve(event.detail.isSatisfied);
      };
      element.addEventListener('onFeedback', listener);
    });
  });
};
/* eslint-enable arrow-body-style */

describe('should trigger event listeners', () => {
  it('should dispatch event on yes', async (done) => {
    listenToEvent().then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
    const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
    await yesButton.click();
  });

  it('should dispatch event on no', async (done) => {
    listenToEvent().then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    await noButton.click();
  });

  it('should send satisfied response on yes', async (done) => {
    listenToEvent().then((isSatisfied) => {
      expect(isSatisfied).toBe(true);
      done();
    }).catch((err) => {
      done(err);
    });
    const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
    await yesButton.click();
  });

  it('should send satisfied response on no', async (done) => {
    listenToEvent().then((isSatisfied) => {
      expect(isSatisfied).toBe(false);
      done();
    }).catch((err) => {
      done(err);
    });

    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    await noButton.click();
  });
});
