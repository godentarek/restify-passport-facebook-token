function UserApi(db) {

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
		});
	}
	
	this.getAll = function(reg, res, next) {
		db.User.find({}, function(error, users) {
			res.send(users);
		});
	}

	this.post = function(req, res, next) {
		if (req.params.email === undefined) {
			return next(new restify.InvalidArgumentError('Email must be supplied'));
		}
		var userData = {
			email: req.params.email,
			fname: req.params.fname,
			lname: req.params.lname
		};
		var user = new User(userData);
		user.save(function(error, data) {
			if (error) {
				return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
			} else {
				res.json(data);
			}
			res.send(201, user);
		});
	}
	
	this.put = function(req, res, next) {
		if (req.params.email === undefined) {
			return next(new restify.INvalidArgumentError('Email must be supplied'));
		}
		var userData = {
			email: req.params.email,
			fname: req.params.fname,
			lname: req.params.lname
		};
		db.User.update({_id: req.params.id}, userData, {multi: false}, function(error, user) {
			if (error) {
				return next(new restify.InvalidArgymentError(JSON.stringify(error.errors)));
			}
			res.send();
		});
	}
	
	this.del = function(req, res, next) {
		db.User.remove({_id: req.params.id}, function(error, user) {
			if (error) {
				return
				next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
			}
			res.send();
		});
	}
}
module.exports = function(db) {
	return new UserApi(db)
}
