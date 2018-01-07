// var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
}

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
   }

module.exports = function(passport) {
passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, function(req,username, password, done){
        loginUser = function() {
        User.findOne({ 'username' : username }, function(err, user){
            if(err)
                return done(err);
            if(!user) { 
                console.log("User not found with username" + username);
                return done(null, false);
            }
            if(!isValidPassword(user, password)) {
                console.log("Invalid password");
                return done(null, false);
            }
            return done(null, user);
        });
        }
        process.nextTick(loginUser);
    })
);

}