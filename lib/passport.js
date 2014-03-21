module.exports = function(config, server, db) {

	var FB_LOGIN_PATH    = '/api/facebook_login'
	var FB_CALLBACK_PATH = '/api/facebook_callback'
	var FB_APPID = '250295951819613'
	var FB_APPSECRET = 'dab167f048cf79b90c426ee53f984b20'
	var SERVER_PREFIX = 'http://localhost:8000'

	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy;
	var FacebookTokenStrategy = require('passport-facebook-token').Strategy;

	server.use(passport.initialize());
	
	var fb_login_handler    = passport.authenticate('facebook', { session: false })
	var fb_callback_handler = passport.authenticate('facebook', { session: false }) 
	var fb_callback_handler2 = function(req, res, next) {
	    //console.log('we b logged in!')
	    //console.dir(req.user)
	    // be sure to send a response
	    res.send('accessToken: ' + req.user.accessToken);
		return next();
	}
	
	server.get(FB_LOGIN_PATH,    fb_login_handler)
	server.get(FB_CALLBACK_PATH, fb_callback_handler, fb_callback_handler2)
 
	passport.use(new FacebookStrategy({
	    clientID:     FB_APPID,
	    clientSecret: FB_APPSECRET,
	    callbackURL:  SERVER_PREFIX + FB_CALLBACK_PATH
	  },
	  function(accessToken, refreshToken, profile, done) {
		  //TODO: initialize user
	      //console.log('accessToken='+accessToken+' facebookId='+profile.id)
		  
	      return done(null, {profile:profile,accessToken:accessToken});
	  })
	)
	
	passport.use(new FacebookTokenStrategy({
	    clientID: FB_APPID,
	    clientSecret: FB_APPSECRET
	  },
	  function(accessToken, refreshToken, profile, done) {
		  //console.log(accessToken);
		  //console.log(profile);
	    //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
	    //  return done(err, user);
	    //});
		return done(null, profile);
	  }
	));
	
	return passport;
};
