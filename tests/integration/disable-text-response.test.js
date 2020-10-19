/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/disabled-text-response.html');
  await page.click('.nhsuk-user-feedback-form--yes');
});

describe('Form is added to page', () => {
  it('should display on page', async () => {
    const banner = await page.$('.nhsuk-user-feedback-form');
    expect(banner).not.toBe(null);
  });
});

describe('Skip text response', () => {
  it('should load the confirmation page straight away', async () => {
    const title = await page.$eval('h2', (element) => element.innerText);
    expect(title).toBe('Thank you for your feedback.');
  });

  it('should not have feedback message', async () => {
    const message = await page.$eval('p', (element) => element.innerText);
    expect(message).not.toBe('We do not check feedback every day and cannot respond to comments.');
  });
});
