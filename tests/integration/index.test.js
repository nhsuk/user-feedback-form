/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
});

describe('Form is added to page', () => {
  it('should display on page', async () => {
    const banner = await page.$('.nhsuk-user-feedback-form');
    expect(banner).not.toBe(null);
  });
});
