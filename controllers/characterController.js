const Character = require('../models/character')
const Category = require('../models/category')
const Product = require('../models/product')

require('dotenv').config()

const crypto = require('crypto')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const { Readable } = require('stream')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const ObjectId = mongodb.ObjectId;

const async = require('async')
const { json } = require('body-parser')

let mongoDBURI = process.env.MONGODB_URI;
mongoose.connect(mongoDBURI, { useNewUrlParser: true , useUnifiedTopology: true})
let db = mongoose.connection;
let db2 = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error'));

let gfs, gfs2, gridfsbucket, gridfsbucket2;

db.once('open',()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(db,{
        bucketName: 'character_uploads'
    });
    
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('character_uploads');
})

db2.once('open',()=>{
    gridfsbucket2 = new mongoose.mongo.GridFSBucket(db2,{
        bucketName: 'product_uploads'
    });

    gfs2= Grid(db, mongoose.mongo);
    gfs2.collection('product_uploads');
})

exports.character_list_get = function(req,res){
    Character.find({})
    .exec(function(err, list_characters){
        if(err) { return next(err); }
        res.render('characters_list', { title:"Character List", character_list: list_characters })
    })
}

exports.character_detail_get = function(req,res, next){
    // try {
    //     let photoID = req.params.id;
    //   } catch(err) {
    //     return res.status(400).json({ message: "Invalid PhotoID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
    //   }
    
    //   let bucket = new mongodb.GridFSBucket(db, {
    //     bucketName: 'character_uploads'
    //   });
    
    //   let downloadStream = bucket.openDownloadStream(photoID);
    
    //   downloadStream.on('data', (chunk) => {
    //     res.write(chunk);
    //   });
    
    //   downloadStream.on('error', () => {
    //     res.sendStatus(404);
    //   });
    
    //   downloadStream.on('end', () => {
    //     res.end();
    //   });
    const character_id = req.params.id;

    async.series({

        // function(err, results){
        //     if(err){ return next(err);}
        //     if(results.length==0){
        //         let err = new Error('Character not found');
        //         err.status = 404;
        //         return next(err);
        //     }
        // }
        
        character(callback){
            Character.findById(req.params.id).populate('category').exec(callback)
        },
        products(callback){
            Product.find({ character: req.params.id }).exec(callback)
        }
    }, 
    async function(err, results){
        if(err) return next(err);
        if(results==null || results.length ==0){
            let err = new Error('Error in retreiving character');
            err.status = 404
            return next(err)
        }
        await gfs.files.findOne({_id:results.character.image}, async (err, file)=>{
            if(!file){
                console.log('NO');
                return new Error('Image does not exist');
            }
            console.log('Works')
            // image.fill(file)
            // image.fill(file)
            res.render('character_detail', { title: results.character.name, character: results.character, error: err, image: file, products: results.products })
        })
    })
    // function(err, results){
    //     let actualImage;
    //     if(err){ return next(err); }
    //     if(results==null || results.length==0){
    //         let err = new Error('Character retreival error');
    //         err.status = 404
    //         return next(err);
    //     }
    //     let photoId;
    //     if(results.character.image!=null){
    //         try {
    //             photoId = results.character.image
    //             // let photoID = req.params.id;
    //           } catch(err) {
    //             return res.status(400).json({ message: "Invalid PhotoID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
    //           }
            
    //           let bucket = new mongodb.GridFSBucket(db, {
    //             bucketName: 'character_uploads'
    //           });
            
    //           let downloadStream = bucket.openDownloadStream(photoId);
    //           downloadStream.on('data', (chunk) => {
    //             // res.write(chunk);
    //             actualImage.write(chunk);
    //           });
            
    //           downloadStream.on('error', () => {
    //             res.sendStatus(404);
    //           });
            
    //           downloadStream.on('end', () => {
    //             // res.end();
    //             actualImage.end()
    //           });
    //     }
    //     console.log(res);
    //     res.render('character_detail', { error: err, title: results.name,character: results.character, imageId: photoId, image: actualImage })
    // })
}

exports.character_create_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.character_create_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.character_delete_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.character_delete_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.character_update_get = function(req,res){
    res.json({info:"To be implemented"})
}

exports.character_update_post = function(req,res){
    res.json({info:"To be implemented"})
}

exports.get_image = function(req, res){
    gfs.files.findOne({ filename: req.params.filename }, (err, file)=>{
        if(!file || file.length==0 ){
            return res.status(404).json({
                err:'No file exists'
            })
        }
        if(file.contentType==='image/jpeg'||file.contentType==='image/png'){
            // Read output to browser
            const readstream = gridfsBucket.openDownloadStream(file._id);
            readstream.pipe(res);
        }else{
            return res.status(404).json({
                err:'Not an image'
            })
        }
    })
}

exports.get_image_from_id = async function(req, res){
    // console.log(typeof req.params.id)
    await gfs2.files.findOne({_id: new ObjectId(req.params.id)}, function(err, file){
        if(!file || file.length==0 ){
            return res.status(404).json({
                err:'No file exists'
            })
        }
        console.log(file)
        if(file.contentType==='image/jpeg'||file.contentType==='image/png'){
            // Read output to browser
            const readstream = gridfsbucket2.openDownloadStream(file._id);
            readstream.pipe(res);
        }else{
            return res.status(404).json({
                err:'Not an image'
            })
        }
    })
}

// async function get_character_category(category_id){
//     Category.findOne({_id: category_id}, (err, category)=>{
//         if(!category || category.length==0){
//             return res.status(404).json({
//                 err: 'Category does not exist'
//             })
//         }else{
//             console.log(category)
//             return category
//         }
//     })
// }