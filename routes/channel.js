var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var isAuth = require('../../tools/auth-tools').isAuth;
var User = mongoose.model('User');
var Canal= mongoose.model('Canal');
var Message = mongoose.model('Message');
var Emote = mongoose.model('Emote');



router.post('/new', isAuth,function(req,res){
    var canal = req.body;
    canal.admin = req.user;
    canal.users = req.user;
    Canal.create(canal,function(err){
        if(err) {
            console.log("Canal not created");
            res.redirect('/canal/list');
        }else{
            console.log('Canal created');
            res.redirect('/canal/list');
        }
    });
});

router.get('/delete/:id',isAuth,function(req,res){
    Canal.findByIdAndRemove(req.params.id, function(err,item){
        if(err){
            return res.send("Error");
            res.redirect('/canal/list');
        }
        else
            res.redirect('/canal/list');
        });
});

router.get('/kickUser/:idChannel/:idUser', isAuth, function(req, res, next) {
    Channel.findByIdAndUpdate(req.params.idChannel, {$pull: {activeUsers: req.params.idUser}}, function(err, item){
      if(err)
        return res.send("Impossible à l'utilisateur de le retirer des admins du canal de discution.", err);
      res.redirect('back');
    });
  });

  router.post('/create', isAuth, function(req, res) {
    
      var newChannel = req.body;
    
      newChannel.messages = new Array();
      newChannel.admins = new Array();
      newChannel.activeUsers = new Array();
      newChannel.bannedUsers = new Array();
      newChannel.admins.push(req.user);
    
    
      Channel.create(newChannel, function(err, item){
        res.redirect('/channel/' + item._id);
      });
    
    });


module.exports = router;