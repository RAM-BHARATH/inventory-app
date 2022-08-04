var express = require('express');
const character_controller = require('../controllers/characterController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/inventory');
});

router.get('/image/:filename', character_controller.get_image);

router.get('/image/id/:id', character_controller.get_image_from_id);

// router.get('/get-category-characters/:id', character_controller.get_category_characters);

module.exports = router;

