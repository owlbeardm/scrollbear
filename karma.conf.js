const webpackConf = require("./webpack.js");
// const puppeteer = require('puppeteer');
// process.env.CHROME_BIN = puppeteer.executablePath();
// process.env.CHROMIUM_BIN = puppeteer.executablePath();


module.exports = function(config) {
  config.set({
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-translate',
          '--disable-extensions',
          '--no-proxy-server'
        ]
      }
    },
    frameworks: ['jasmine'],
    reporters: ['spec'],
    plugins: [
      'karma-spec-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false, // print the time elapsed for each spec
      failFast: false // test would finish with error when a first fail occurs.
    },
    // autoWatch: !config.singleRun,
    singleRun: true,
    colors: true,
    port: 9876,
    basePath: '',
    files: [
      'node_modules/jquery/dist/jquery.js',
      'app/app.module.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/index_test.js'
    ],
    preprocessors: {
      'app/app.module.js': ['webpack', 'sourcemap'],
      'app/index_test.js': ['webpack', 'sourcemap']
    },
    exclude: [],
    webpack: webpackConf(undefined, {
      'mode': 'test'
    }),
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    }
  });
};
