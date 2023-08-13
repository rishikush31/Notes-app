const express = require('express');
const router = express.Router();
const {uploadProfilePic} = require("../Controller/uploadProfilePic");

router.post('/uploadProfilePic',uploadProfilePic);

module.exports=router;
