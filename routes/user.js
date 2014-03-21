module.exports = function(server, db) {

	var users = require('../controllers/users')(db);
	var fin = function(req, res) {
		res.send();
	};

	server.get('/user/:uid([0-9a-f]+)', users.show);
}
