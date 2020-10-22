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

    const title = await page.$('h2');
    expect(title).not.toBe(null);
    const text = await page.evaluate((element) => element.innerText, title);
    expect(text).toBe('Thank you for your feedback.');
  });

  it('should register a positive vote', async (done) => {
    const yesButton = await page.$('.nhsuk-user-feedback-form--yes');
    page.on('request', (request) => {
      const data = JSON.parse(request.postData());
      expect(data.isSatisfied).toBe(true);
      expect(request.url()).toBe('http://localhost:8080/my-endpoint/satisfied');
      done();
    });
    await yesButton.click();
  });
});
