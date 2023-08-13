const express = require('express');
const router = express.Router();
const {deleteNote} = require("../Controller/deleteNote");

router.post('/deleteNote',deleteNote);

module.exports=router;
