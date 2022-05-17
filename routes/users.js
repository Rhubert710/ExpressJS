var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//myname
router.get('/myname', function(req, res, next) {
  res.send('my name is Robert');
});

//myfavoritemovies 
router.get('/myfavoritemovies', function(req, res, next) {
  res.json(['a, b']);
});


module.exports = router;
