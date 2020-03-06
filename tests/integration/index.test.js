/* global page */

describe('Form is added to page', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080/tests/example/');
  });

  it('should display on page', async () => {
    const banner = await page.evaluate(async () => document.querySelector('.nhsuk-user-feedback-form'));
    expect(banner).not.toBe(null);
  });
});
