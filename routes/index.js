var express = require('express');
const character_controller = require('../controllers/characterController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/inventory');
});

router.get('/image/:filename', character_controller.get_image);

router.get('/image/id/:id', character_controller.get_image_from_id);

module.exports = router;

