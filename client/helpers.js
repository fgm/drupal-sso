Meteor._debug("Loading client/helpers", CHANNEL_NAME, EVENT_NAME);
Meteor.startup(function () {
  // Helper names have to be well-formed JS identifiers, so they cannot use a
  // "namespace.symbol" format... but a "namespace$symbol" is usable.

  /**
   * @param {DrupalSSO} sso
   */
  Template.registerHelper('drupal_sso$userId', function (sso) {
    return sso.getUserId();
  });

  /**
   * @param {DrupalSSO} sso
   */
  Template.registerHelper('drupal_sso$userName', function (sso) {
    return sso.getUserName();
  });

  /**
   * @param {DrupalSSO} sso
   */
  Template.registerHelper('drupal_sso$userRoles', function (sso) {
    return sso.getUserRoles();
  });
});
