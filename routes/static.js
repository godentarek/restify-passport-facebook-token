module.exports = function(server, restify, db) {

  server.get(/^(?!\/api)\/?.*/, restify.serveStatic({
    directory: './public',
    default: 'index.html'
  }));
}
