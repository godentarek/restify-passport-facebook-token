module.exports = function(config, server, db) {

	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy;
	var FacebookTokenStrategy = require('passport-facebook-token').Strategy;

	server.use(passport.initialize());

	server.get(config.facebook.loginPath, passport.authenticate('facebook', {session: false}))
	server.get(config.facebook.callbackPath, passport.authenticate('facebook', {session: false}), function(req, res, next) {
		//TODO: Send access token and profile info to client
		res.json({accessToken: req.user.accessToken})
		return next();
	})

	passport.use(
		new FacebookStrategy({
				clientID: config.facebook.id,
				clientSecret: config.facebook.secret,
				callbackURL: config.facebook.realm + config.facebook.callbackPath
			},
			function(accessToken, refreshToken, profile, done) {
				//TODO: validate user
				return done(null, {
					profile: profile,
					accessToken: accessToken
				});
			})
	);

	passport.use(
		new FacebookTokenStrategy({
				clientID: config.facebook.id,
				clientSecret: config.facebook.secret
			},
			function(accessToken, refreshToken, profile, done) {
				//TODO: validate user
				return done(null, {
					profile: profile,
					accessToken: accessToken
				});
			})
	);

	return passport;
};
