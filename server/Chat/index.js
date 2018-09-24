const express = require('express'),
    router = express.Router(),
    Storage = require('../Storage')


router.get("/users",(req,res) => {
    //get usario
    Storage.getData('users')
           .then((users)=>{
            res.json(users)
           }).catch((err)=>{
            res.sendStatus(500).json(err)
           })
})

router.get("/messages",(req,res) => {
    //get messages
    Storage.getData('messages')
           .then((messages)=>{
            res.json(messages)
           }).catch((err)=>{
            res.sendStatus(500).json(err)
           })
})

router.post("/users",(req,res) => {
    //post usario
    let user = req.body.user
    Storage.getData('users')
           .then((users)=>{
            return new Promise((resolve,reject)=>{
                Storage.saveData('users',user,users)
                       .then((msg)=>{
                        resolve(msg)
                       }).catch((err)=>{
                        reject(err)
                       })
            })
           }).then((respons)=>{
              res.json(respons)
           }).catch((err)=>{
              res.sendStatus(500).json(err)
           })
})

router.post("/messages",(req,res) => {
    //post messages
    let message = req.body.message

    Storage.getData('messages')
           .then((messages)=>{
             return new Promise((resolve,reject)=>{
                Storage.saveData('messages',message,messages)
                       .then((msg)=>{
                        resolve(msg)
                       }).catch((err)=>{
                        reject(err)
                       })

            })
           }).then((respons)=>{
              res.json(respons)
           }).catch((err)=>{
              res.sendStatus(500).json(err)
           })
})

module.exports = router;