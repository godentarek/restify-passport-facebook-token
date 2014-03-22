module.exports = function(server, restify, db, passport) {

  var users = require('../controllers/users')(restify, db);

  var V0_PATH = {
    path: '/api/user',
    version: '0.1.0'
  };
  var V0_OBJECT_PATH = {
    path: '/api/user/:id',
    version: '0.1.0'
  };

  var authenticate = passport.authenticate('facebook-token', {session: false});

  server.get(V0_PATH, authenticate, users.getAll);
  server.get(V0_OBJECT_PATH, authenticate, users.get);
  server.post(V0_PATH, authenticate, users.post);
  server.put(V0_OBJECT_PATH, authenticate, users.put);
  server.del(V0_OBJECT_PATH, authenticate, users.del);
}
