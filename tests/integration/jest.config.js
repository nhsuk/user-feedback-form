module.exports = {
  displayName: 'Integration tests',
  preset: 'jest-puppeteer',
  rootDir: '.',
  testTimeout: 10000,
  testMatch: [
    '<rootDir>/*.test.js',
  ],
};
