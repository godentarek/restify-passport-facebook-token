function UserApi(restify, db) {

	this.getAll = function(req, res, next) {
		db.User.find({}, function(error, users) {
			res.send(users);
			next();
		});
	}

	this.get = function(req, res, next) {
		db.User.findOne({_id: req.params.id}, function(error, user) {
			if (error) {
				return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
			}
			if (user) {
				res.send(user);
			} else {
				res.send(404);
			}
			return next();
		});
	}

	this.post = function(req, res, next) {
		if (req.params.email === undefined) {
			return next(new restify.InvalidArgumentError('Email must be supplied'));
		}
		var userData = {
			email: req.params.email,
			firstName: req.params.firstName,
			lastName: req.params.lastName
		};
		var user = new db.User(userData);
		user.save(function(error, data) {
			if (error) {
				return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
			} else {
				res.json(data);
			}
			res.send(201, user);
			return next();
		});
	}
	
	this.put = function(req, res, next) {
		if (req.params.email === undefined) {
			return next(new restify.INvalidArgumentError('Email must be supplied'));
		}
		var userData = {
			email: req.params.email,
			firstName: req.params.firstName,
			lastName: req.params.lastName
		};
		db.User.update({_id: req.params.id}, userData, {multi: false}, function(error, user) {
			if (error) {
				return next(new restify.InvalidArgymentError(JSON.stringify(error.errors)));
			}
			res.send();
			return next();
		});
	}
	
	this.del = function(req, res, next) {
		db.User.remove({_id: req.params.id}, function(error, user) {
			if (error) {
				return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
			}
			res.send();
			return next();
		});
	}
}

module.exports = function(restify, db) {
	return new UserApi(restify, db)
}
