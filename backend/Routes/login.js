const express = require('express');
const router = express.Router();
const {loginValidator} = require('../Controller/loginValidator');
const { body } = require('express-validator');

router.post("/login",[
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
    // these callback validators are used to tell validation method , what to validate
],loginValidator);

module.exports=router;