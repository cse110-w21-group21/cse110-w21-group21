/* eslint-disable */
module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "http://127.0.0.1:5500/source/index.html"
    },
    testMatch: [
      "**/test/**/*.test.js"
    ],
    verbose: true
}