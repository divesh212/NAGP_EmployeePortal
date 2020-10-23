var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:name', (req, res, next) => {
  res.send("<h1>Hello " + req.params.name + "</h1>");
})

module.exports = router;
