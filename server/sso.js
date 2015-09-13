// Cause an error on startup if the Drupal server is unreachable.
Meteor.startup(function () {
  sso = new DrupalSSO();
  if (!sso.state.online) {
    throw new Meteor.Error('startup', "Could not reach the Drupal server.");
  }
});

Meteor.methods({
  /**
   * Parse Meteor settings to initialize the SSO state from the server.
   */
  "drupal-sso.initState": function () {
    var settings = Meteor.settings['drupal-sso'];
    var site = settings.site;
    var appToken = settings.appToken;

    if (!settings) {
      throw new Meteor.Error('invalid-settings', "Invalid settings: 'drupal-sso' key not found.");
    }
    if (!site) {
      throw new Meteor.Error('invalid-settings', "Invalid settings: 'drupal-sso.site' key not found.");
    }
    if (!appToken) {
      throw new Meteor.Error('invalid-settings', "Invalid settings: 'drupal-sso.appToken' key not found.");
    }

    var options = {
      params: {
        appToken: settings.appToken
      }
    };
    try {
      var ret = HTTP.get(site + "/meteor/siteInfo", options);
      info = JSON.parse(ret.content);
      info.online = true;
    }
    catch (err) {
      info = {
        cookieName: undefined,
        anonymousName: undefined,
        online: false
      };
      Meteor._debug("Error: ", err);
    }
    Meteor._debug("initState returning", info);
    return info;
  },

  "drupal-sso.whoami": function () {
  },
});
