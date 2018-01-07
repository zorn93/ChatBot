var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var isAuth = require('../../tools/auth-tools').isAuth;
var User = mongoose.model('User');
var Canal= mongoose.model('Canal');


router.get('/add/:idc/:idu',isAuth,function(req,res){
    Canal.findById(req.params.idc,function(err,canal){  
       if(ElementInArray(req.params.idu,canal.users).length==0){
            User.findById(req.params.idu,function(err,user){
                Canal.update({_id:canal._id},{$push :{users : user}},function(err,item){
                    res.redirect('/user/list/'+req.params.idc);
                });
            }); 
       }else{
            console.log("L'utilisateur existe déjà ");
            res.redirect('/user/list/'+req.params.idc);
       }
    });
});

router.get('/promote/:idc/:idu',isAuth,function(req,res){
    Canal.findById(req.params.idc,function(err,canal){
        if(ElementInArray(req.params.idu,canal.admin).length==0){
            User.findById(req.params.idu,function(err,user){
                Canal.update({_id:canal._id},{$push :{admin : user}},function(err,item){
                    res.redirect('/user/list/'+req.params.idc);
                });
            });
        }else{
            console.log("Déja promu");
            res.redirect('/user/list/'+req.params.idc);
        }
    });
});

;

module.exports = router;