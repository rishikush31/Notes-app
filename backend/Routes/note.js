const express = require('express');
const router = express.Router();

const {createNote} = require("../Controller/createNote");

router.post("/createNote",createNote);

module.exports=router;