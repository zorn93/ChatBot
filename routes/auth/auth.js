var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var isAuth = require('../tools/authentification').isAuth;

var User = mongoose.model('User');

require('../passport/local_login')(passport);
require('../passport/local_signup')(passport);
require('../passport/facebook')(passport);
require('../passport/twitter')(passport);
require('../passport/google')(passport);

router.get('/signup', function(req, res){
    res.render('authentification/signup');
});

router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/',
    failureRedirect :'signup'
}));

router.post('/authentification/setUsername', isAuth, function(req, res){
  User.findOneAndUpdate({ "_id" : req.user._id }, { $set: { "username" : req.body.username} }, function(){
    res.redirect('/');
  });
});
 
router.get('/authentification/facebook', passport.authenticate('facebook', {
    scope : ['public_profile', 'email']
}));

router.get('/authentification/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/authentification/username',
    failureRedirect : 'login'
}));

router.get('/authentification/google', passport.authenticate('google', {
  scope : [ 'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read' ]
}));

router.get('/authentification/google/callback', passport.authenticate('google', {
    successRedirect : '/authentification/username',
    failureRedirect : 'login'
}));



router.get('/authentification/twitter', passport.authenticate('twitter', {
    scope : ['public_profile', 'email']
}));

router.get('/authentification/twitter/callback', passport.authenticate('twitter', {
    successRedirect : '/',
    failureRedirect : '/login'
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});




module.exports = router;