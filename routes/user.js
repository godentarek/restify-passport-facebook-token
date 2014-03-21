module.exports = function(api, db) {

	var users = require('../controllers/users')(db);

	api.get('/user', users.getAll);
	api.get('/user/:id([0-9]+)', users.get);
	api.post('/user', users.post);
	api.put('/user/:id([0-9]+)', users.put);
	api.del('/user/:id([0-9]+)', users.del);
}
