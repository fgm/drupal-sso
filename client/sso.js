// Write your package code here!

Meteor.startup(function () {
  var sso = new DrupalSSO();
  sso.updateUser(document.cookie);
});
