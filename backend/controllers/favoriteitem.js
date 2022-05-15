const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require("../kafka/client");
const auth = require("../middleware/auth");


router.post("/add", auth, async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "add_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
    
});

router.post("/remove", auth, async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "remove_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
    
});

router.get("/:userId",auth, async (req, res) => {
    const msg = {};
    msg.userId = req.params.userId;
    msg.path = "get_user_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
});

router.post("/filter", auth, async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "get_user_filtered_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
    
});


module.exports = router;