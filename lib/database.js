var mongoose = require('mongoose');

module.exports = function(config, cb) {

  mongoose.connect(config.db.url, {
    server: {
      keepAlive: 1,
      auto_reconnect: true
    }
  });

  function log(msg, err) {
    if (err) {
      console.log(msg, err);
    } else {
      console.log(msg);
    }
  }

  mongoose.connection.on('error', function(err) {
    log('mongo connection error: ', err);
    mongoose.disconnect();
  });

  mongoose.connection.on('open', function() {
    log('mongo connection opened');
    cb(null, mongoose);
  });
};
