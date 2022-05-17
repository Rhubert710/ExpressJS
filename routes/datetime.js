var express = require('express');
var router = express.Router();

let date =new Date()

/* GET datetime */
router.get('/', function(req, res, next) 
{
    res.send(date.toString());
});

module.exports = router;