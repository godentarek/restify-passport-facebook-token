var restify = require('restify');
var config = require('./config.json');
var server = restify.createServer({
  name: 'node-restify-passport-mongoose-api'
});

// Config API settings
require('./lib/settings')(config, server, restify);

// Setup mongo database
require('./lib/database')(config, function(err, mongoose) {

  // Connection err
  if (err) {
    console.log('Mongo connection error:', err);
    process.exit(1);
  }

  // Build models
  var db = require('./models')(mongoose, config);

  // Setup Security
  var passport = require('./lib/passport')(config, server, db);

  // Setup API routes
  require('./routes')(server, restify, db, passport);

  // Start Server
  server.listen(config.port, function() {
    console.log('%s listening at %s', server.name, server.url)
  });
});
