exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'firefox',
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    homepage: 'e2e/**/*.js',
    // search: ['tests/e2e/contact_search/**/*Spec.js',
    //   'tests/e2e/venue_search/**/*Spec.js'
    // ]
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },
  framework: 'jasmine',
};
