/* eslint-disable */
module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "http://localhost:5000/"
    },
    testMatch: [
      "**/test/**/*.test.js"
    ],
    verbose: true
}