const express = require('express');
const router = express.Router();
const {deleteUser} = require("../Controller/deleteUser");

router.post('/deleteUser',deleteUser);

module.exports=router;
