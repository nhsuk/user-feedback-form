/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
});

describe('Can answer no', () => {
  it('should display button on page', async () => {
    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    expect(noButton).not.toBe(null);
  });

  it('should proceed to confirmation page', async () => {
    const yesButton = await page.$('.nhsuk-user-feedback-form--no');
    await yesButton.click();

    const title = await page.$('h2');
    expect(title).not.toBe(null);
    const text = await page.evaluate((element) => element.innerText, title);
    expect(text).toBe('Thank you for your feedback.');
  });

  it('should register a negative vote', async (done) => {
    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    page.on('request', (request) => {
      const data = JSON.parse(request.postData());
      expect(data.isSatisfied).toBe(false);
      expect(request.url()).toBe('http://localhost:8080/my-endpoint/satisfied');
      done();
    });
    await noButton.click();
  });
});
