/* global page expect */

beforeEach(async () => {
  await page.goto('http://localhost:8080/tests/example/');
  await page.click('.nhsuk-user-feedback-form--yes');
});

describe.skip('Text comments', () => {
  it('should have text input', async () => {
    const textarea = await page.$('textarea');
    expect(textarea).not.toBe(null);
  });

  it('should have close button', async () => {
    const closeButton = await page.$('.close');
    expect(closeButton).not.toBe(null);
  });

  it('close button should go to first question', () => {
    test.todo('close button action');
  });

  it('should have help text', async () => {
    const helpText = await page.$('helptext');
    expect(helpText).not.toBe(null);
  });

  it('should have max character limit', () => {
    test.todo('max char limit');
  });

  it('submission should register comments', () => {
    test.todo('comments POST request');
  });

  it('blank submission should not register comments', () => {
    test.todo('empty comments, no POST request');
  });

  it('submission should show confirmation text', () => {
    test.todo('confirmation text');
  });

  it('blank submission should still show confirmation text', () => {
    test.todo('confirmation text');
  });
});
