module.exports = function(server, restify, db) {

	var users = require('../controllers/users')(restify, db);
	
	var PATH = '/api/user';
	var OBJECT_PATH = '/api/user/:id';
	
	var V1_0_0 = '1.0.0';
	var V1_PATH = {path: PATH, version: V1_0_0};
	var V1_OBJECT_PATH = {path: OBJECT_PATH, version: V1_0_0};
	
	server.get(V1_PATH, users.getAll);
	server.get(V1_OBJECT_PATH, users.get);
	server.post(V1_PATH, users.post);
	server.put(V1_OBJECT_PATH, users.put);
	server.del(V1_OBJECT_PATH, users.del);
}
