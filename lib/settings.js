module.exports = function(config, server, restify) {
	
	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.bodyParser());
	server.use(restify.gzipResponse());
	
	server.pre(restify.pre.userAgentConnection());
};
