module.exports = function(config, server, restify) {
	server.use(restify.bodyParser());
};
