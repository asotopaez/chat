var express = require('express');
var router = express.Router();
var Storage = require('../Storage')


router.get("/users",function(req,res){
    //get usario
    Storage.getData('users')
           .then(function(users){
            res.json(users)
           }).catch(function(err){
            res.sendStatus(500).json(err)
           })
})

router.get("/messages",function(req,res){
    //get messages
    Storage.getData('messages')
           .then(function(messages){
            res.json(messages)
           }).catch(function(err){
            res.sendStatus(500).json(err)
           })
})

router.post("/users",function(req,res){
    //post usario
    var user = req.body.user
    Storage.getData('users')
           .then(function(users){
            return new Promise(function(resolve,reject){
                Storage.saveData('users',user,users)
                       .then(function(msg){
                        resolve(msg)
                       }).catch(function(err){
                        reject(err)
                       })
            })
           }).then(function(respons){
              res.json(respons)
           }).catch(function(err){
              res.sendStatus(500).json(err)
           })
})

router.post("/messages",function(req,res){
    //post messages
    var message = req.body.message

    Storage.getData('messages')
           .then(function(messages){
             return new Promise(function(resolve,reject){
                Storage.saveData('messages',message,messages)
                       .then(function(msg){
                        resolve(msg)
                       }).catch(function(err){
                        reject(err)
                       })

            })
           }).then(function(respons){
              res.json(respons)
           }).catch(function(err){
              console.log(err)
              res.sendStatus(500).json(err)
           })
})

module.exports = router;