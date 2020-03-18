/* global page expect jest */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
  await page.click('.nhsuk-user-feedback-form--yes');
});

describe('Text comments', () => {
  it('should have text input', async () => {
    const textarea = await page.$('textarea');
    expect(textarea).not.toBe(null);
  });

  it('should have close button', async () => {
    const closeButton = await page.$('.nhsuk-user-feedback-form--close');
    expect(closeButton).not.toBe(null);
  });

  it('close button should go to first question', async () => {
    const closeButton = await page.$('.nhsuk-user-feedback-form--close');
    await closeButton.click();

    const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
    expect(yesButton).not.toBe(null);
  });

  it('should have help text', async () => {
    const helpText = await page.$('.nhsuk-hint');
    expect(helpText).not.toBe(null);
  });

  it.skip('should have max character limit', () => {
    test.todo('max char limit');
  });

  it('submission should register comments', async (done) => {
    const textarea = await page.$('textarea');
    const submitButton = await page.$('.nhsuk-user-feedback-form--submit');
    await textarea.type('Lorem ipsum');
    page.once('request', (request) => {
      const data = JSON.parse(request.postData());
      expect(data).toEqual({ comments: 'Lorem ipsum' });
      expect(request.url()).toBe('http://localhost:8080/my-endpoint/comments');
      done();
    });
    await submitButton.click();
  });

  it('blank submission should not register comments', async () => {
    const submitButton = await page.$('.nhsuk-user-feedback-form--submit');
    const requestCallback = jest.fn();
    page.once('request', requestCallback);
    await submitButton.click();
    await page.waitFor(500); // wait 500ms to see if a request is sent
    expect(requestCallback).not.toBeCalled();
  });

  it('submission should show confirmation text', async () => {
    const textarea = await page.$('textarea');
    const submitButton = await page.$('.nhsuk-user-feedback-form--submit');
    textarea.type('Lorem ipsum');
    await submitButton.click();
    const confirmationText = await page.$('p');
    expect(confirmationText).not.toBe(null);
    const text = await page.evaluate((element) => element.innerText, confirmationText);
    expect(text).toBe('We do not check feedback every day and cannot respond to comments.');
  });

  it('blank submission should still show confirmation text', async () => {
    const submitButton = await page.$('.nhsuk-user-feedback-form--submit');
    await submitButton.click();
    const confirmationText = await page.$('p');
    expect(confirmationText).not.toBe(null);
    const text = await page.evaluate((element) => element.innerText, confirmationText);
    expect(text).toBe('We do not check feedback every day and cannot respond to comments.');
  });
});
