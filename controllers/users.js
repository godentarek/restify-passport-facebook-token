function UserApi(db) {

	var ObjectId = require('mongoose').Types.ObjectId

	this.show = function(req, res) {
		db.User.findOne(ObjectId(req.params.uid), function(err, user) {
			if (err || !user) {
				return res.send(403, {
					error: 'Invalid user'
				})
			}
			res.json(user)
		})
	}

}
module.exports = function(db) {
	return new UserApi(db)
}
