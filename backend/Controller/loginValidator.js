const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "MYnameisRishiKushFoodwebsiteHello";
const userCredential = require('../model/userCredential')

exports.loginValidator = async (req, res) => {

    //get errors array of results of body validation written in route
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "enter email and password of correct format", errors: errors.array() });
    }

    // email in req body
    let email = req.body.email;

    // find the user object 
    let userData = await userCredential.findOne({ email });

    // if we dont find the user object that means that no such email is registered 
    if (!userData) {
        return res.status(404).json({ success: false, message: "no such email is registered", errors: "no such email is registered" })
    }

    //compares password of body and encoded password saved in database
    const passwordtocompare = await bcrypt.compare(req.body.password, userData.password);

    if (!passwordtocompare) {
        return res.status(404).json({ 
            success: false, 
            message: "wrong password", 
            errors: "wrong password" 
        })
    }

    const data = {
        user: {
            id: userData.id
        }
    }

    const authToken = jwt.sign(data, jwtSecret);

    //return authentication token 
    return res.json({ 
        success: true, 
        myProfilePic:userData.myProfilePic,
        name:userData.name,
        authToken: authToken 
    });
}