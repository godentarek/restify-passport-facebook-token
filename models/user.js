module.exports = function(mongoose, config) {

	var Schema = mongoose.Schema;
	var ObjectId = Schema.Types.ObjectId;

	var userSchema = new Schema({
		username: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		password: {
			type: String,
			required: true
		}
	}, {
		versionKey: false
	});

	return mongoose.model('user', userSchema);
};
