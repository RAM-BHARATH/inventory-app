const Category = require('../models/category')
const Character = require('../models/character')
const async = require('async')
const Product = require('../models/product')

const { body, validationResult } = require('express-validator');


exports.category_list_get = function(req, res, next){
    Category.find({})
        .sort({ title:1 })
        .exec(function(err, list_categories){
            if(err){ return async.next(err);}
            res.render('categories', { title:'Categories List', category_list: list_categories })
        });
}

exports.category_detail_get = function(req, res, next){
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
    res.render('category_form', { title: 'Create Category' })
}

exports.category_create_post = [
    body('category_name', 'Category name required').trim().isLength({ min:3 }).escape(),
    body('category_description', 'Category description required').trim().isLength({ min:3 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let category = new Category({
            name: req.body.category_name,
            description: req.body.category_description
        });

        if(!errors.isEmpty()){
            res.render('category_form', { title: 'Create Product', category: category, errors: errors.array() })
        } else{
            Category.findOne({ 'name': req.body.category_name })
            .exec(function(err, found_category){

                if(err){ return next(err) }
                
                if(found_category){
                    res.redirect(found_category.url)
                }else{
                    category.save(function(err){
                        if(err){ return next(err); }
                        res.redirect(category.url)
                    })
                }
            })
        }
    }
];

exports.category_delete_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.category_delete_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.category_update_get = function(req, res, next){
    Category.findById(req.params.id)
    .exec(function(err, category){
        if(err){ next(err) }
        if(!category || category.length==0){
            let err = new Error('Category does not exist');
            err.status = 404;
            return next(err);
        }
        res.render('category_form', { title: 'Update Category', category: category })
    })
}

exports.category_update_post = [
    body('category_name', 'Category name should not be empty').trim().isLength({ min:3 }).escape(),
    body('category_description', 'Category description should not be empty').trim().isLength({ min:3 }).escape(),

    (req, res, next)=>{
        const errors = validationResult(req);

        let category = new Category({
            name: req.body.category_name,
            description: req.body.category_description,
            _id: req.params.id
        })
        if(!errors.isEmpty()){
            res.render('category_form', { title: 'Update Category', category: category, errors: errors.array() })
        }else{
            Category.findByIdAndUpdate(req.params.id, category, {}, function(err, updatedCategory){
                if(err) { return next(err); }
                res.redirect(updatedCategory.url);
            })
        }
    }
]

// exports.category_update_post = function(req, res, next){
//     res.json({d:'d'})
// }
