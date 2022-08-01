const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    description: { type:String, maxLength:1500 },
    image: { type: Schema.Types.ObjectId, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
})

CharacterSchema
.virtual('url')
.get(function(){
    return '/inventory/character/'+this._id;
})

module.exports = mongoose.model('Character', CharacterSchema);