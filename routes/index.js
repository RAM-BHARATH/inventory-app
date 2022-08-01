var express = require('express');
const { get_image } = require('../controllers/characterController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/inventory');
});

router.get('/image/:filename', get_image);

module.exports = router;
