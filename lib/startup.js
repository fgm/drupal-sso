/**
 * The SSO constructor.
 *
 * Notice that the returned sso instance has asynchronous behavior: its state
 * component will only be initialized once the server callback has returned,
 * which will almost always be some milliseconds after the instance itself is
 * returned: check sso.state.online to ensure the connection attempts is done:
 * - undefined -> not yet
 * -> false -> failed, values are defaults,
 * -> true -> succeeded,valuers are those provided by the server.
 *
 * @param {string} document_cookies
 * @returns {DrupalSSO}
 * @constructor
 */
DrupalSSO = function (document_cookies) {
  // Called without `new`: call with it.
  if (!(this instanceof DrupalSSO)) {
    return new DrupalSSO(document_cookies);
  }

  // Work around "this" interpretation in local scope methods.
  var that = this;

  this.settings = {
    client: {}
  };

  this.state = {
    anonymousName: 'anome',
    cookieName: 'SESS___4___8__12__16__20__24__28__32',
    // Online is only set once the initialization has completed.
    online: undefined
  };

  var user = {
    uid: 0,
    name: 'undefined name',
    roles: ['anonymous user']
  };

  var userDep = new Tracker.Dependency();

  this.getUserId = function () {
    userDep.depend();
    return user.uid;
  };

  this.getUserName = function () {
    userDep.depend();
    return user.name;
  };

  this.getUserRoles = function () {
    userDep.depend();
    return user.roles;
  };

  /**
   * Parse a cookie blob for value of the relevant session cookie.
   *
   * @param {string} cookieBlob
   * @returns {undefined}
   */
  this.getSessionCookie = function (cookieBlob) {
    cookieBlob = '; ' + cookieBlob;

    var cookieName = that.state.cookieName;
    var cookieValue = undefined;
    var cookies = cookieBlob.split('; ' + cookieName + "=");

    if (cookies.length == 2) {
      cookieValue = cookies.pop().split(';').shift();
    }

    return cookieValue;
  }

  // Constructor body.
  _.extend(that.settings.client, Meteor.settings.public);

  Meteor.call('drupal-sso.initState', function (err, res) {
    if (err) {
      throw new Meteor.Error('init-state', err);
    }
    _.extend(that.state, res);
  });
};
