Package.describe({
  name: 'fgm:drupal-sso',
  version: '0.0.1',
  summary: 'A transparent authentication package for Drupal',
  // git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // If no version is specified for an 'api.use' dependency, use the one defined in Meteor 0.9.0.
  api.versionsFrom('1.1.0.3');

  // Need to addFiles() for each file in the package.
  api.addFiles('drupal-sso.js');

  // This is a reactive source exposing the user session information.
  api.export('DrupalSession');
  // This contains the server-only information for the Drupal instance:
  // - The application token
  api.export('DrupalServer', 'server');

  //* @var "client", "server", "web.browser", or "web.cordova".
  // var architecture
  //   When not specified, component is available everywhere.

  //* @var { weak: Boolean, unordered: Boolean }
  // var options
  //   both options default to false.

  // api.use('packagename@version', architecture, options)
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('fgm:drupal-sso');
  api.addFiles('drupal-sso-tests.js');
});

// Npm.depends({ packageName: "version", ... });
// Cordova.depends({ packageName: "version", packageName2: "http://packageName2.tar", ... });
