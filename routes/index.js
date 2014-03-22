module.exports = function(server, restify, db, passport) {

  function req(route) {
    require('./' + route)(server, restify, db, passport);
  }

  req('user');
  req('static');
};
