const express = require('express');
const router = express.Router();

const {getMyNotes} = require('../Controller/getMyNotes');

router.post('/getMyNotes',getMyNotes);

module.exports = router; 