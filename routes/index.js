module.exports = function(server, restify, db) {

	function req(route) {
		require('./' + route)(server, restify, db);
	}

	req('user');
	req('static');
};
