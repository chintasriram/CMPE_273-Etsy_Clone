const express = require("express");
const router = express.Router();
const passport = require('passport');
const auth = require("../middleware/auth");
const kafka = require("../kafka/client");


router.get("/", auth, async (req, res) => {
    const msg = {};
    msg.body = {};
    msg.path = "get_all_currency";
    kafka.make_request('currency',msg, function(err,results){
        if (err){
            console.log("currency")

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

router.get("/:currencyId", auth, async (req, res) => {
    const msg = {};
    msg.currencyId = req.params.currencyId;
    msg.path = "get_specific_currency";
    kafka.make_request('currency',msg, function(err,results){
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