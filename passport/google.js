
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User = require('../models/user');
var config = require('../config/auth');

module.exports =  function(passport) {
    passport.use('google', new GoogleStrategy({
        clientID : config.google.clientID,
        clientSecret : config.google.clientSecret,
        callbackURL : config.google.callback
    },
    function(token, refreshToken, profile, done) {
        loginOrSignUp = function() {
            User.findOne({ 'google.id' : profile.id }, function(err, user){
                if(err)
                    return done(err);
                
                    if(user) {
                        return done(null, user);
                    } else {
                        var nUser = new User();

                        console.log(profile);
                        nUser.google.id = profile.id;
                        nUser.google.token = token;
                        nUser.email = profile.email;
                        nUser.username = profile.displayName;
                        nUser.isAdmin = false;
                        nUser.isSuperAdmin = false;
                        nUser.save(function(err) {
                            if(err)
                                throw err;

                            return done(null, nUser);
                        })
                    }
            })
        }
        process.nextTick(loginOrSignUp);
    }))
}