// Write your package code here!
Meteor._debug("Loading client/sso", CHANNEL_NAME, EVENT_NAME);

Meteor.startup(function () {
  var sso = new DrupalSSO();
  sso.updateUser(document.cookie);
});
