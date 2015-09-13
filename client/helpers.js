Meteor.startup(function () {
  // Helper names have to be well-formed JS identifiers, so they cannot use a
  // "namespace.symbol" format... but a "namespace$symbol" is usable.
  Template.registerHelper('drupal_sso$userId', function () {
    return 42;
  });

  Template.registerHelper('drupal_sso$userName', function () {
    return "yopa";
  });

  Template.registerHelper('drupal_sso$userRoles', function () {
    return ['foo', 'bar'];
  });
});
