var express = require('express');
var router = express.Router();

router.get('/random-number', function(req, res, next) {
  const minValue = req.query.minvalue;
  const maxValue = req.query.maxvalue;

  let randomNumber = Math
});

module.exports = router;
