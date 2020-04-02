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
    expect(labelText).toBe('Tell us what we could do to improve the website (optional)');
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
