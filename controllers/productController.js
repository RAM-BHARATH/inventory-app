const Character = require('../models/category')
const Category = require('../models/category')
const Product = require('../models/product')

const async = require('async')

exports.index = function(req, res){
    async.parallel({
        product_count(callback){
            Product.countDocuments({}, callback);
        },
        category_count(callback){
            Category.countDocuments({}, callback);
        },
        character_count(callback){
            Character.countDocuments({}, callback);
        }
    }, function(err, results){
        res.render('index', { title: 'Inventory Home', error: err, data: results })
    })
}

exports.product_list_get = function(req, res, next){
    async.parallel({
        products(callback){
            Product.find({})
            .populate('category')
            .populate('character')
            .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err);
        }
        res.render('products_list', { title: 'Products', products: results.products })
    })
}

exports.product_detail_get = function(req, res, next){
    async.parallel({
        product(callback){
            Product.findById(req.params.id)
            .populate('category')
            .populate('character')
            .exec(callback)
        }
    }, function(err, result){
        if(err){
            return next(err);
        }
        res.render('product_detail', { title: result.product.name, product: result.product })
    })
}

exports.product_create_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.product_create_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.product_delete_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.product_delete_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.product_update_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.product_update_post = function(req,res){
    res.json({info:"To be implemented"})
}
