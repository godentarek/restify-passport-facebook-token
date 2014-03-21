module.exports = function(mongoose, config) {

	var Schema = mongoose.Schema;
	var ObjectId = Schema.Types.ObjectId;

	var userSchema = new Schema({
		email: {
			type: String,
			required: true,
			trim: true
		},
		fname: {
			type: String,
			required: false,
			trim: true
		},
		lname: {
			type: String,
			required: false,
			trim: true
		}
	});

	return mongoose.model('user', userSchema);
};
