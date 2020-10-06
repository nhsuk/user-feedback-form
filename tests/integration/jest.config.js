module.exports = {
  displayName: 'Integration tests',
  preset: 'jest-puppeteer',
  rootDir: '.',
  testMatch: [
    '<rootDir>/*.test.js',
  ],
  testTimeout: 10000,
};
