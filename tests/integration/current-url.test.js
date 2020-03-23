/* global page expect */

describe('Should log the current url', () => {
  it('should register a vote against the current url', async (done) => {
    await page.goto('http://localhost:8080/tests/example/');
    const noButton = await page.$('.nhsuk-user-feedback-form--no');
    page.once('request', (request) => {
      const data = JSON.parse(request.postData());
      expect(data.url).toBe('http://localhost:8080/tests/example/');
      done();
    });
    await noButton.click();
  });
});
