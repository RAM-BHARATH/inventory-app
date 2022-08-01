const Category = require('../models/category')
const Character = require('../models/character')
const async = require('async')
const Product = require('../models/product')


exports.category_list_get = function(req, res, next){
    Category.find({})
        .sort({ title:1 })
        .exec(function(err, list_categories){
            if(err){ return async.next(err);}
            res.render('categories', { title:'Categories List', category_list: list_categories })
        });
}

exports.category_detail_get = function(req,res){
    async.parallel({
        category(callback){
            Category.findById(req.params.id)
                .exec(callback)
        },
        characters(callback){
            Character.find({'category': req.params.id})
            .limit(5)
            .exec(callback);
        },
        products(callback){
            Product.find({ 'category': req.params.id })
            .limit(2)
            .exec(callback);
        }
    }, function(err, results){
        if(err) { return next(err); }
        if(results.category == null){
            let err = new Error('Category not found');
            err.status = 400
            return next(err);
        }
        res.render('category_detail', { title: results.category.name, category: results.category, characters: results.characters, products: results.products, error: err  })
    })
}

exports.category_create_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.category_create_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.category_delete_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.category_delete_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.category_update_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.category_update_post = function(req,res){
    res.json({info:"To be implemented"})
}
