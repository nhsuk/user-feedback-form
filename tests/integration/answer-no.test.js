/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
});

describe('Can answer no', () => {
  it('should display button on page', async () => {
    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    expect(noButton).not.toBe(null);
  });

  it('should proceed to next question', async () => {
    const yesButton = await page.$('.nhsuk-user-feedback-form--no');
    await yesButton.click();

    const labelText = await page.$eval('label', (element) => element.innerText);
    expect(labelText).toBe('What were you looking for? (optional)');
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
