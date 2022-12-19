const express = require('express');
const router = express.Router();

const ApiController = require("../controllers/api-controllers");

router.get('/random-number', ApiController.randomNumber);

module.exports = router;
