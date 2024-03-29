const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { User } = require("../mongo/services/user");
const encrypt = require("../services/encrypt");
const passport = require('passport');
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
    const {name,email,password} = req.body;
    const userRegObj = {name,email,password};
    const response = {};
    if(userRegObj.name && userRegObj.email && userRegObj.password){
        try{
            const exists = await User.checkExists(userRegObj);
            if(exists && exists.userFound){
                response.success = false;
                response.error = "User already exists";
                response.status = "400";
                return res.status(400).send(response);
            }

            const encryptedPassword = await encrypt.cryptPassword(password);
            userRegObj.password = encryptedPassword;
            userRegObj.country = "6282b76f046cf0db1fe1a547";
            userRegObj.currency = "62806d33ebd7f39a16a6703c";
            userRegObj.profilePicture = "3d07ffec355de8f5d8a483d2085b4a4e";
            const result = await User.addUser(userRegObj);
            delete userRegObj.password;
            // Create token
            const token = jwt.sign(
                userRegObj,
                config.get("jwtPrivateKey"),
                {
                    expiresIn: "24h",
                }
            );
            userRegObj.token = token;
            response.user = userRegObj;
            response.success = true;
            response.status = "200";
            response.result = result;
            return res.status(200).send(response);
        }catch(e){
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }
    }else{
        console.log(e);
        response.success = false;
        response.error = "Invalid credentials";
        response.status = "400";
        res.status(400).send(response);
    }
    
});


module.exports = router;