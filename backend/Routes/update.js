const express = require('express');
const router = express.Router();
const {updateNote} = require("../Controller/updateNote");

router.post('/updateNote',updateNote);

module.exports=router;
