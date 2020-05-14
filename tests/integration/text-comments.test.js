/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
  await page.click('.nhsuk-user-feedback-form--yes');
});

describe('Text comments', () => {
  it('should have text input', async () => {
    const textarea = await page.$('textarea');
    expect(textarea).not.toBe(null);
  });

  it('should have help text', async () => {
    const helpText = await page.$('.nhsuk-hint');
    expect(helpText).not.toBe(null);
  });

  it('should trim input at max character limit', async (done) => {
    const textarea = await page.$('textarea');
    const submitButton = await page.$('.nhsuk-user-feedback-form--submit');
    // Type a 1001-char long comment
    await textarea.type('A'.repeat(1001));
    page.once('request', (request) => {
      const data = JSON.parse(request.postData());
      // comment that actually gets posted should be trimmed to 1000 chars
      expect(data).toEqual({ comments: 'A'.repeat(1000) });
      expect(request.url()).toBe('http://localhost:8080/my-endpoint/comments');
      done();
    });
    await submitButton.click();
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

  it('blank submission should register comments', async (done) => {
    const submitButton = await page.$('.nhsuk-user-feedback-form--submit');
    page.once('request', (request) => {
      const data = JSON.parse(request.postData());
      expect(data).toEqual({ comments: '' });
      expect(request.url()).toBe('http://localhost:8080/my-endpoint/comments');
      done();
    });
    await submitButton.click();
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
