/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
});

describe('Can answer yes', () => {
  it('should display button on page', async () => {
    const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
    expect(yesButton).not.toBe(null);
  });

  it('should proceed to next question', async () => {
    const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
    await yesButton.click();

    const labelText = await page.$eval('label', (element) => element.innerText);
    expect(labelText).toBe('Is there anything we could do to make it better?');
  });

  it('should register a positive vote', async (done) => {
    const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
    page.on('request', (request) => {
      const data = JSON.parse(request.postData());
      expect(data.answer).toBe('yes');
      expect(request.url()).toBe('http://localhost:8080/my-endpoint/');
      done();
    });
    await yesButton.click();
  });
});
