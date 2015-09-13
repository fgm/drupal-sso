Package.describe({
  name: 'fgm:drupal-sso',
  version: '0.0.1',
  summary: 'A transparent authentication package for Drupal 8',
  // git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.addFiles('lib/startup.js');
  api.addFiles('client/sso.js', 'client');
  api.addFiles('server/sso.js', 'server');
  api.addFiles('sso.js');

  api.export('DrupalSSO');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('fgm:drupal-sso');
  api.addFiles('drupal-sso-tests.js');
});
