#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')

// const multer = require('multer');
// const {GridFsStorage} = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');
// const bodyParser = require('body-parser');

// var Book = require('./models/book')
// var Author = require('./models/author')
// var Genre = require('./models/genre')
// var BookInstance = require('./models/bookinstance')

const Category = require('./models/category');
const Character = require('./models/character')
const Product = require('./models/product')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const conn = mongoose.createConnection(mongoURI);

// Initialise gfs

// let gfs, gridfsBucket;

// conn.once('open',()=>{
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
//         bucketName: 'uploads'
//     });
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// })

// var storage_product = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// var storage_character = new GridFsStorage({
//   url: mongoURI,
//   file: (file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload_product = multer({ storage_product });
// const upload_character = multer({ storage_character })

// var authors = []
// var genres = []
// var books = []
// var bookinstances = []

let image_paths = []
let products = []
let categories = []
let characters = [] 

// function authorCreate(first_name, family_name, d_birth, d_death, cb) {
//   authordetail = {first_name:first_name , family_name: family_name }
//   if (d_birth != false) authordetail.date_of_birth = d_birth
//   if (d_death != false) authordetail.date_of_death = d_death
  
//   var author = new Author(authordetail);
       
//   author.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Author: ' + author);
//     authors.push(author)
//     cb(null, author)
//   }  );
// }

// function genreCreate(name, cb) {
//   var genre = new Genre({ name: name });
       
//   genre.save(function (err) {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     console.log('New Genre: ' + genre);
//     genres.push(genre)
//     cb(null, genre);
//   }   );
// }

function categoryCreate(name, description, cb){
  let category = new Category({
    name: name,
    description: description
  })

  category.save(function(err){
    if(err){
      cb(err, null);
      return;
    }
    console.log('New Category: '+ category);
    categories.push(category);
    cb(null, category)
  })

}

const dc_desc = 'DC Comics is one of the largest and oldest American comic book companies, with their first comic under the DC banner being published in 1937.[8] The majority of its publications take place within the fictional DC Universe and feature numerous culturally iconic heroic characters, such as Superman, Batman, Wonder Woman, and Aquaman. It is widely known for some of the most famous and recognizable teams including the Justice League, the Justice Society of America, the Suicide Squad and the Teen Titans.'
const marvel_desc = 'Marvel Studios, LLC[4] (originally known as Marvel Films from 1993 to 1996) is an American film and television production company that is a subsidiary of Walt Disney Studios, a division of the Walt Disney Company. Marvel Studios is known for the production of the Marvel Cinematic Universe films, based on characters that appear in Marvel Comics publications.'
const transformers_desc = 'Transformers is a series of American science fiction action films based on the Transformers franchise, which began in the 1980s.'
const harry_potter_desc = 'Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosopher\'s Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011). A spin-off prequel series that is planned to consist of five films started with Fantastic Beasts and Where to Find Them (2016), marking the beginning of the Wizarding World shared media franchise.' 

function createCategories(cb){
    async.series([
      function(callback) {
        categoryCreate("DC Comics", dc_desc, callback);
      },
      function(callback) {
        categoryCreate("Marvel", marvel_desc, callback);
      },
      function(callback){
        categoryCreate("Transformers", transformers_desc, callback);
      },
      function(callback){
        categoryCreate("Harry Potter", harry_potter_desc, callback)
      }],
      // optional callback
      cb);
  }


async.series([
    createCategories
],
// Optional callback
function(err, results){
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('categories: '+categories);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});