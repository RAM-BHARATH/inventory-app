const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {type:String, required: true, minLength:3, maxLength:50},
    description: { type: String, required: true, minLength:3, maxLength:200 },
    price: { type: Number, required: true, min:1, max:100 },
    item_available_count: { type: Number, required: true, min:0, max:10000 },
    image: { type: Schema.Types.ObjectId, required: true },
    category: { type: Schema.Types.ObjectId, ref:'Category', required: true },
    character: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
})

//Bucket name for product images - 'ProductImage', 

ProductSchema
.virtual('url')
.get(function(){
    return '/inventory/product/'+this._id
})


module.exports = mongoose.Model('Product', ProductSchema)