Meteor._debug("Loading server/sso");

// Cause an error on startup if the Drupal server is unreachable.
Meteor.startup(function () {
  Meteor._debug("Startup server/sso", CHANNEL_NAME, EVENT_NAME);

  sso = new DrupalSSO();
  sso.initServerState(Meteor.settings);

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
    return info;
  },

  /**
   *
   * @param {string} cookieBlob
   * @returns {*}
   */
  "drupal-sso.whoami": function (cookieBlob) {
    // sso is a package global, initialized in server/sso.js Meteor.startup().
    var cookieName = sso.state.cookieName;
    var cookieValue = sso.getSessionCookie(cookieBlob);
    var url = sso.settings['drupal-sso'].site + "/meteor/whoami";

    var options = {
      headers: {
        'cookie': cookieName + '=' + cookieValue
      }
    };
    Meteor._debug('Checking ' + cookieName + "=" + cookieValue + ' on ' + url);
    try {
      var ret = HTTP.get(url, options);
      info = JSON.parse(ret.content);
    }
    catch (err) {
      info = {
        'uid': 0,
        'name': 'Unresolved',
        'roles': []
      };
      Meteor._debug("Error: ", err);
    }

    return info;
  }
});
