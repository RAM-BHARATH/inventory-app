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

const mongo = require('mongodb');

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
// let categories = [{
//   name: 'DC Comics',
//   description: 'DC Comics is one of the largest and oldest American comic book companies, with their first comic under the DC banner being published in 1937.[8] The majority of its publications take place within the fictional DC Universe and feature numerous culturally iconic heroic characters, such as Superman, Batman, Wonder Woman, and Aquaman. It is widely known for some of the most famous and recognizable teams including the Justice League, the Justice Society of America, the Suicide Squad and the Teen Titans.',
//   _id: "62e4242cc6c6e1ca6f80e3c2",
//   __v: 0
// },{
//   name: 'Marvel',
//   description: 'Marvel Studios, LLC[4] (originally known as Marvel Films from 1993 to 1996) is an American film and television production company that is a subsidiary of Walt Disney Studios, a division of the Walt Disney Company. Marvel Studios is known for the production of the Marvel Cinematic Universe films, based on characters that appear in Marvel Comics publications.',
//   _id: "62e4242dc6c6e1ca6f80e3c5",
//   __v: 0
// },{
//   name: 'Transformers',
//   description: 'Transformers is a series of American science fiction action films based on the Transformers franchise, which began in the 1980s.',
//   _id: "62e4242dc6c6e1ca6f80e3c7",
//   __v: 0
// },{
//   name: 'Harry Potter',
//   description: "Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosopher's Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011). A spin-off prequel series that is planned to consist of five films started with Fantastic Beasts and Where to Find Them (2016), marking the beginning of the Wizarding World shared media franchise.",
//   _id: "62e4242dc6c6e1ca6f80e3c9",
//   __v: 0
// }]
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


/// Create - Populated using a separate file ////
// function categoryCreate(name, description, cb){
//   let category = new Category({
//     name: name,
//     description: description
//   })

//   category.save(function(err){
//     if(err){
//       cb(err, null);
//       return;
//     }
//     console.log('New Category: '+ category);
//     categories.push(category);
//     cb(null, category)
//   })

// }

// function bookCreate(title, summary, isbn, author, genre, cb) {
//   bookdetail = { 
//     title: title,
//     summary: summary,
//     author: author,
//     isbn: isbn
//   }
//   if (genre != false) bookdetail.genre = genre
    
//   var book = new Book(bookdetail);    
//   book.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Book: ' + book);
//     books.push(book)
//     cb(null, book)
//   }  );
// }

function characterCreate(name, category, description,image, cb){
  let character_detail = {
    name: name,
    description: description,
    image: image
  }
  if(category != false) character_detail.category = category;

  let character = new Character(character_detail);
  character.save(function(err){
    if(err){
      cb(err, null)
      return
    }
    console.log('New Character: '+character)
    characters.push(character)
    cb(null, character)
  })
}

function productCreate(name, description, price, item_available_count, image, category, character, cb){
  let product_detail = {
    name: name,
    description: description,
    price: price,
    item_available_count: item_available_count,
    image: image
  }
  if(category!=false) product_detail.category = category
  if(character!=false) product_detail.character = character

  let product = new Product(product_detail)
  product.save(function(err){
    if(err){
      console.log(err)
      cb(err, null)
      return
    }
    console.log('New Product: '+product)
    products.push(product)
    cb(null, product)
  })
}

// function bookInstanceCreate(book, imprint, due_back, status, cb) {
//   bookinstancedetail = { 
//     book: book,
//     imprint: imprint
//   }    
//   if (due_back != false) bookinstancedetail.due_back = due_back
//   if (status != false) bookinstancedetail.status = status
    
//   var bookinstance = new BookInstance(bookinstancedetail);    
//   bookinstance.save(function (err) {
//     if (err) {
//       console.log('ERROR CREATING BookInstance: ' + bookinstance);
//       cb(err, null)
//       return
//     }
//     console.log('New BookInstance: ' + bookinstance);
//     bookinstances.push(bookinstance)
//     cb(null, book)
//   }  );
// }


// function createGenreAuthors(cb) {
//     async.series([
//         function(callback) {
//           authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
//         },
//         function(callback) {
//           authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
//         },
//         function(callback) {
//           authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
//         },
//         function(callback) {
//           authorCreate('Bob', 'Billings', false, false, callback);
//         },
//         function(callback) {
//           authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
//         },
//         function(callback) {
//           genreCreate("Fantasy", callback);
//         },
//         function(callback) {
//           genreCreate("Science Fiction", callback);
//         },
//         function(callback) {
//           genreCreate("French Poetry", callback);
//         },
//         ],
//         // optional callback
//         cb);
// }

// function createCategories(cb){
//   async.series([
//     function(callback) {
//       categoryCreate("DC Comics", callback);
//     },
//     function(callback) {
//       categoryCreate("Marvel", callback);
//     },
//     function(callback){
//       categoryCreate("Transformers", callback);
//     },
//     function(callback){
//       categoryCreate("Harry Potter", callback)
//     }],
//     // optional callback
//     cb);
// }


// function createBooks(cb) {
//     async.parallel([
//         function(callback) {
//           bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [genres[0],], callback);
//         },
//         function(callback) {
//           bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [genres[0],], callback);
//         },
//         function(callback) {
//           bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], callback);
//         },
//         function(callback) {
//           bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], callback);
//         },
//         function(callback) {
//           bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [genres[1],], callback);
//         },
//         function(callback) {
//           bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], callback);
//         },
//         function(callback) {
//           bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authors[4], false, callback)
//         }
//         ],
//         // optional callback
//         cb);
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

const dc_desc = 'DC Comics is one of the largest and oldest American comic book companies, with their first comic under the DC banner being published in 1937. The majority of its publications take place within the fictional DC Universe and feature numerous culturally iconic heroic characters, such as Superman, Batman, Wonder Woman, and Aquaman. It is widely known for some of the most famous and recognizable teams including the Justice League, the Justice Society of America, the Suicide Squad and the Teen Titans.'
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

const batman_description = "Batman is the superhero protector of Gotham City, a tortured, brooding vigilante dressed as a bat who fights against evil and strikes fear into the hearts of criminals everywhere. In his public identity he is Bruce Wayne, billionaire industrialist and notorious playboy. Although he has no superhuman abilities, he is one of the world's smartest men and greatest fighters. His physical prowess, technical ingenuity, and tactical thinking make him an incredibly dangerous opponent. He is also a founding member of the Justice League.";
const superman_description = "Superman (born Kal-El, legal name Clark Kent) is the last son of Krypton, sent as the dying planet's last hope to Earth, where he grew to become its kind, noble protector. Though he was apparently killed shortly after the Darkseid War, his essence merged with the New Earth Superman in Rebirth, creating a new, merged timeline for Superman. He is also a founding member of the Justice League."
const ironman_description = "Tony Stark is a genius inventor and billionaire industrialist, who suits up in his armor of cutting-edge technology to become the super hero Iron Man. The adopted son of weapons manufacturer Howard StarkTony inherited his family's company at a young age following his parents' death. While overseeing a manufacturing plant in a foreign country, Stark was kidnapped by local terrorists. Instead of giving in to his captors\' demands to build weapons for them, Stark created a powerful suit of armor for himself to escape. Returning to America, Stark further upgraded the armor and put his vast resources and intellect to use for the betterment of the world as Iron Man."
const optimus_prime_description = 'Optimus Prime is the main character of Transformers: Prime and the official leader of the Autobots during the war on Cybertron, as well as the leader of Team Prime. Before the Great War, Optimus Prime was originally known as Orion Pax; a young data clerk who worked in Iacon, under the wing of Alpha Trion. Alpha Trion was a mentor to Orion Pax and believed in Orion to become the next Prime. Orion Pax was chosen by the High Council and became \"Optimus Prime,\" upon being entrusted with the Matrix of Leadership by Primus himself. Years of war against his old friend/rival, Megatron, have brought Optimus and his team to Earth. On Earth, Optimus fights with his team to survive and to end the brutal war against their enemies, once and for all.';

function createCharacters(cb) {
  async.parallel([
      function(callback) {
        characterCreate('Batman', [categories[0]], batman_description,  new mongoose.Types.ObjectId('62e43ce80fa1510348453b06'), callback);
      },
      function(callback){
        characterCreate('Superman', [categories[0]], superman_description,new mongoose.Types.ObjectId('62e43d910fa1510348453b16'), callback);
      },
      function(callback){
        characterCreate('Iron Man', [categories[1]], ironman_description, new mongoose.Types.ObjectId('62e43d550fa1510348453b0a'), callback);
      },
      function(callback){
        characterCreate('Optimus Prime', [categories[2]], optimus_prime_description, new mongoose.Types.ObjectId('62e43d780fa1510348453b0e'), callback);
      }],
      // optional callback
      cb);
}

let product_1_description = 'Batman stands an impresive 20 inches tall, Batman comes complete with soft goods cape, 7 points of articulation, Perfect for kids and the kid at heart, For ages 3 and up'
let product_2_description = 'The one and only - Superman!, Based on his appearance in DC Comics\' The New 52 series, 7-inches tall, The Man of Steel includes 4 alternate heads and 8 interchangeable hands!, Incredibly poseable, he comes with a figure stand.'
let product_3_description = 'By the Power of Grayskull! Celebrate your love for He-Man by adding this remarkable Masters of the Universe Masterverse He-Man 40th Anniversary Action Figure to your toy box or collection shelf. This vintage-style He-Man stands roughly 7-inches tall in all his glory, and he features 30 points of articulation and comes with a power sword, a shield, an axe, and a pair of swappable hands. Ages 6 and up.'
let product_4_description = 'The Superman: Rebirth Superman Page Punchers 3-Inch Scale Action Figure features 5 points of articulation for kicking and punching motion, and comes with a DC Universe Rebirth Superman #1 comic book that can be resealed in the clamshell blister packaging.'


function createProducts(cb){
  async.parallel([
    function(callback){
      productCreate('Batman Classic', product_1_description, 99, 10, new mongoose.Types.ObjectId('62e43fa63e90e512960f3c10') ,[categories[0]],[characters[0]], callback);
    },
    function(callback){
      productCreate('Superman Amazing Yamaguchi', product_2_description, 59, 8,  new mongoose.Types.ObjectId('62e440243e90e512960f3c1c'), [categories[0]], [characters[1]], callback);
    },
    function(callback){
      productCreate('Masters of the Universe Masterverse He-Man 40th Anniversary Action Figure', product_3_description, 99, 24, new mongoose.Types.ObjectId('62e43fff3e90e512960f3c14'), false, false, callback);
    },
    function(callback){
      productCreate('Superman Rebirth', product_4_description, 69, 12,  new mongoose.Types.ObjectId('62e440313e90e512960f3c20'), [categories[0]], [characters[1]], callback);
    }], 
  cb);
}

// function createBookInstances(cb) {
//     async.parallel([
//         function(callback) {
//           bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
//         }
//         ],
//         // Optional callback
//         cb);
// }



// async.series([
//     createGenreAuthors,
//     createBooks,
//     createBookInstances
// ],
// // Optional callback
// function(err, results) {
//     if (err) {
//         console.log('FINAL ERR: '+err);
//     }
//     else {
//         console.log('BOOKInstances: '+bookinstances);
        
//     }
//     // All done, disconnect from database
//     mongoose.connection.close();
// });

async.series([
  createCategories,
  createCharacters,
  createProducts,
],
// Optional callback
function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
  else {
      console.log('Products: '+products);
  }
  // All done, disconnect from database
  mongoose.connection.close();
  // conn.close();
});



