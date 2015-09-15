Meteor._debug("Loading server/web");

Meteor.startup(function () {
  Meteor._debug("Startup server/sso", CHANNEL_NAME, EVENT_NAME);
  var stream = new Meteor.Stream(CHANNEL_NAME);

  WebApp.connectHandlers.use('/updateUser', function (req, res, next) {
    res.writeHead(200);
    res.end('Send refresh request');
    Meteor._debug('Emitting refresh request.');
    stream.emit(EVENT_NAME);
  });

  WebApp.connectHandlers.use('/updateUserDeferred', function (req, res, next) {
    res.writeHead(200);
    res.end('Send refresh request');
    Meteor.setTimeout(function () {
      Meteor._debug('Emitting refresh request.');
      stream.emit(EVENT_NAME);
    }, 1000);
  });
});
