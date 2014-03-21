module.exports = function(server, db) {

	function req(route) {
		return require('./' + route)(server, db);
	}

	req('user');
};
