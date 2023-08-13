const express = require('express');
const router = express.Router();
const {createUser} = require("../Controller/createUser");
const { body} = require('express-validator');

router.post('/createUser',[
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })
],createUser);

module.exports=router;