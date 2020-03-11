/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
});

describe.skip('Can answer no', () => {
  it('should display button on page', async () => {
    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    expect(noButton).not.toBe(null);
  });

  it('should proceed to next question', async () => {
    const yesButton = await page.$('.nhsuk-user-feedback-form--no');
    await yesButton.click();
    // textarea is on the next question
    const textarea = await page.$('textarea');
    expect(textarea).not.toBe(null);
  });

  it('should register a negative vote', async (done) => {
    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    page.on('request', (request) => {
      const data = JSON.parse(request.postData());
      expect(data.answer).toBe('no');
      done();
    });
    await noButton.click();
  });
});
