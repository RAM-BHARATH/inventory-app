const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/productController');
const category_controller = require('../controllers/categoryController');
const character_controller = require('../controllers/characterController');

/* GET home page. */
router.get('/', product_controller.index);

router.get('/products', product_controller.product_list_get);

router.get('/product/create', product_controller.product_create_get);

router.post('/product/create', product_controller.product_create_post);

router.get('/product/:id/delete', product_controller.product_delete_get);

router.post('/product/:id/delete', product_controller.product_delete_post);

router.get('/product/:id/update',product_controller.product_update_post);

router.post('/product/:id/update',product_controller.product_update_post);

router.get('/product/:id', product_controller.product_detail_get);

router.get('/categories', category_controller.category_list_get);

// router.get('/character-category/:id', character_controller.get_character_category);

router.get('/category/create', category_controller.category_create_get);

router.post('/category/create', category_controller.category_create_post);

router.get('/category/:id/delete', category_controller.category_delete_get);

router.post('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id/update', category_controller.category_update_get);

router.post('/category/:id/update', category_controller.category_update_post);

router.get('/category/:id', category_controller.category_detail_get);

router.get('/characters', character_controller.character_list_get);

router.get('/character/create', character_controller.character_create_get);

router.post('/character/create', character_controller.character_create_post);

router.get('/character/:id/delete', character_controller.character_delete_get);

router.post('/character/:id/delete', character_controller.character_delete_post);

router.get('/character/:id/update', character_controller.character_update_get);

router.post('/character/:id/update', character_controller.character_update_post);

router.get('/character/:id', character_controller.character_detail_get);

router.get('/get-category-characters/:id', character_controller.get_category_characters);

router.get('/*', function(req, res){
  res.render('404', {title:'404'});
})
module.exports = router;
