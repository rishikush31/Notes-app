const express = require('express');
const router = express.Router();
const {SocialLogin} = require('../Controller/SocialLogin');

router.post("/socialLogin",SocialLogin);

module.exports=router;