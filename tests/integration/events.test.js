/* global page expect */

beforeEach(async () => {
    await page.goto('http://localhost:8080/tests/example/');
  });

describe('should trigger event listeners', () => {
    it('should dispatch event on yes', async (done) => {
        await page.exposeFunction('handlePositiveFeedbackEvent', () => {
            done();
        });

        await page.$eval('#nhsuk-user-feedback-form', (el) => {
        el.addEventListener('onFeedback', () => {
            window.handlePositiveFeedbackEvent();
        });
        });
        const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
        await yesButton.click();
    });

    it('should dispatch event on no', async (done) => {
        await page.exposeFunction('handleNegativeFeedbackEvent', () => {
            done();
        });

        await page.$eval('#nhsuk-user-feedback-form', (el) => {
        el.addEventListener('onFeedback', () => {
            window.handleNegativeFeedbackEvent();
        });
        });
        const noButton = await page.$('.nhsuk-user-feedback-form--no');
        await noButton.click();
    });
});