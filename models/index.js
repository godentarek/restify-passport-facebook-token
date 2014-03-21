module.exports = function(mongoose, config) {

	function req(model) {
		return require('./' + model)(mongoose, config);
	}

	return {
		User: req('user'),
	};
};
