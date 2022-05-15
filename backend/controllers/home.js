const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { User } = require("../mongo/services/user");
const encrypt = require("../services/encrypt");
const router = express.Router();
const passport = require('passport');
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    console.log("Home Page");
    res.send(200);
});


module.exports = router;