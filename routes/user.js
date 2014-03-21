module.exports = function(api, db) {

	var users = require('../controllers/users')(db);

	api.get('/user', users.getAll);
	api.get('/user/:id', users.get);
	api.post('/user', users.post);
	api.put('/user/:id', users.put);
	api.del('/user/:id', users.del);
}
