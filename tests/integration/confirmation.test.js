/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
  await page.click('.nhsuk-user-feedback-form--yes');
});

describe('Confirmation text', () => {
  it('should have title', async () => {
    const title = await page.$('h2');
    expect(title).not.toBe(null);

    const text = await page.evaluate((element) => element.innerText, title);
    expect(text).toBe('Thank you for your feedback.');
  });

  it('should have message', async () => {
    const message = await page.$('p');
    expect(message).not.toBe(null);

    const text = await page.evaluate((element) => element.innerText, message);
    expect(text).toBe('Can you help us improve the NHS website by answering some more questions about your visit today?');
  });
});
